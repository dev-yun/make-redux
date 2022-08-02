// 만약 store의 데이터를 componentA와 componentB가 사용할때, componentA가 state의 상태를 바꾼 경우 componentB는 이 사실을 알 수 없다.
// 이러한 문제를 해결하기 위해 구독 발행 모델이 컨셉이 등장하였다.

// 구독 발행 모델이란 : 어떤 함수를 구독하면 그 함수의 데이터(상태)가 변할때 그 함수를 호출하여 알려줄 수 있는 모델이다.
function createStore() {
    let state;
    // 구독할 함수 목록
    const handlers = [];
    
    function send(action) {
        state = worker(state, action);
        handlers.forEach(handler => handler());
    }

    function getState() {
        return state;
    }

    // 구독 함수
    function subscribe(handler) {
        handlers.push(handler);
    }

    return {
        send,
        getState,
        subscribe,
    };
}

// 상태를 변경하는 함수에서도 state가 참조형이기 때문에 원본 state를 변경하지 않기 위하여 얕은 복사를 해준다.
// Redux에서는 상태 변경 함수에 얕은 복사를 사용하기 때문에 2depth 이상의 구조는 사용하지 않길 권장한다.

// 상태변화함수에는 Redux의 컨벤션이 적용되는데, 첫번째 인자로는 state, 두번째 인자로는 Action 객체가 넘어온다.
// Action 객체는 어떤 일을 하라는 정보가 들어있다.
function worker(state = { count : 0 }, action) {
    
    // action에는 여러 type이 올 수 있으므로 switch문을 많이 사용한다.
    switch(action.type){
      case 'increase':
        return { ...state,count : state.count + 1 };
      default:
        return { ...state };  
    }
}

// store : 상태의 묶음 
const store = createStore();

// 데이터가 변할때마다 구독기가 호출되어 state 값을 호출한다.
store.subscribe(function() {
    console.log(store.getState())
})

// 상태 업데이트 (문제점 : send()가 대체 뭘 바꾸는지 알수없다.)
// flux flow의 Action이 필요하다.(Action에는 상태변화함수가 뭘 바꿔야 하는지 힌트가 담겨 있어 Action을 받아야 한다.) => Redux의 컨벤션임
// Action 객체는 함수를 호출할때 적용하는데 이때 Redux가 제안하는 Action 객체의 모양이 있다.
// type이라는 key와 문자열 value를 갖는 객체를 하나 추가하고 문자열의 값은 알아서 네이밍 하면 된다.
store.send({ type : 'increase' });
store.send({ type : 'increase' });
store.send({ type : 'increase' });