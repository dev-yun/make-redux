// flux의 flow대로 one-way-binding이 되도록 코드를 구현해야한다.
// 즉 store에서 component로 데이터(상태)가 흘러가지만 component에서는 store에 영향을 줄 수 없다.

// 상태를 store에 그대로 반환하여 component로 넘겨주면 component에서 state를 제어할 수 있게된다. (참조형이기 때문에) (one-way에 위배됨)
// 때문에 return에 상태를 그대로 넘겨주지 않고 state를 제어하는 함수를 통해 간접적으로 넘겨준다. 
function createStore() {
    // state 값은 worker에서 변경해도 참조가 깨졌기 때문에 항상 undefined값으로 고정됨. (변하지 않음)
    let state;
    // 언제 상태변경함수(worker)을 실행해야하는지 알 수 없으므로 타이밍에 맞게 사용하기 위해 send함수를 작성하고 store객체에 넘겨줌
    function send() {
        // 바깥쪽에 있는 함수에서 createStore 내부의 state의 값을 변경하기 위해 함수 내로 들어옴
        state = worker(state);
    }

    // state의 값을 외부에서 확인하기 위한 함수
    function getState() {
        return state;
    }

    return {
        send,
        getState,
    };
}

// 상태를 변경하는 함수 : 개발자가 상태의 구조를 알고 변경하는 함수를 작성해야한다.
// 상태를 변경하는 함수에서도 state가 참조형이기 때문에 원본 state를 변경하지 않기 위하여 얕은 복사를 해준다.
// Redux에서는 상태 변경 함수에 얕은 복사를 사용하기 때문에 2depth 이상의 구조는 사용하지 않길 권장한다.
function worker(state = { count : 0 }) {
    return {
        ...state,
        count : state.count+1
    }    
}

// store : 상태의 묶음 
const store = createStore();

// 상태 업데이트
store.send();
// 상태 호출
console.log(store.getState())
