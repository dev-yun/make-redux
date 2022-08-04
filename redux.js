// 만약 action에 추가 데이터가 들어간다면 payload에 데이터를 넣어 사용한다.
// 여러 매개변수를 각각의 내부 함수가 처리하도록 쪼개는 currying 기법 사용
// curry를 사용함으로써 actionCreator(INCREASE, PAYLOAD)를 줄이고 payload만 인자로 받아 사용할 수 있는 상태가 됨 (redux에서 자주 사용하는 테크닉)
export const actionCreator = type => payload => ({ type, payload })

// redux에서는 사용자가 상태를 바꾸는 함수를 reducer라고 한다. (worker로 구현한 부분)
export function createStore(reducer) {
    let state;
    // 구독할 함수 목록
    const handlers = [];
    
    // action을 상태로 보낸다는 의미의 dispath라는 이름을 사용한다. (send로 구현한 부분)
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

    return store;
}
