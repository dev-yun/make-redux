import * as Actions from './action-types.js';

// 상태 변경 로직은 매우 많으므로 따로 분리

// Redux에서는 상태 변경 함수의 인자에 얕은 복사를 사용하기 때문에 2depth 이상의 구조는 사용하지 않길 권장한다.
// 상태변화함수에는 Redux의 컨벤션이 적용되는데, 첫번째 인자로는 state, 두번째 인자로는 action 객체가 넘어온다.

const InitializeState = {
    message: 'app store',
    request: false,
};


export default function reducer(state = InitializeState, action) {
    switch(action.type) {
      case Actions.INCREASE_COUNTER:
        if(action.payload){
            return { ...state, counter: state.counter + action.payload };    
        }else{
            return { ...state, counter: state.counter === undefined ? 1 : state.counter + 1 };
        }
      case Actions.DECREASE_COUNTER:
        if(action.payload){
            return { ...state, counter: state.counter - action.payload };    
        }else{
            return { ...state, counter: state.counter === undefined ? 1 : state.counter - 1 };
        }
      case Actions.SET_COUNTER:
        return { ...state, counter: action.payload };
      case Actions.ASYNC_REQUEST:
        return { ...state, request: true };
      case Actions.ASYNC_RESPONSE:
        return { ...state, request: false };
      default:
         return { ...state };
    }
  }