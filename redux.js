// 만약 action에 추가 데이터가 들어간다면 payload에 데이터를 넣어 사용한다.
// 여러 매개변수를 각각의 내부 함수가 처리하도록 쪼개는 currying 기법 사용
// curry를 사용함으로써 actionCreator(INCREASE, PAYLOAD)를 줄이고 payload만 인자로 받아 사용할 수 있는 상태가 됨 (redux에서 자주 사용하는 테크닉)
export const actionCreator = type => payload => ({ type, payload })

// middlewares에는 비동기를 처리하는 등 다른 역할을 하는 함수들이 element로 포함된다.
export function createStore(reducer, middlewares = []) {
    let state;
    // 구독할 함수 목록
    const handlers = [];
    
    function dispatch(action) {
        state = reducer(state, action);
        handlers.forEach(handler => handler());
    }

    function getState() {
        return state;
    }

    // 구독 함수
    function subscribe(handler) {
        handlers.push(handler);
    }

    const store = {
        dispatch,
        getState,
        subscribe,
    };

    middlewares = Array.from(middlewares).reverse();
    let lastDispatch  = dispatch;

    // 처음 dispatch를 lastDispatch에 넣고 N개의 middlewares를 돌면서 모든 middleware를 redux흐름에 맞춰 실행시킨다.
    middlewares.forEach(middleware => {
        lastDispatch = middleware(store)(lastDispatch);
    })

    // 마지막으로 원본 dispatch에 middleware들의 정보를 담은 lastDispatch를 오버라이트 한다.
    // 이러한 테크닉을 Monkey patching 이라고 한다. (기존의 함수를 다른 것으로 교체하고 교체된 함수에 다른것을 끼어넣은뒤 기존의 함수에 오버라이트 함)
    store.dispatch = lastDispatch;

    return store;
}
