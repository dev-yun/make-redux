// 실제론 action 종류가 많아 따로 분리한다.
// action을 추가하는 과정 : action-types.js에 action 추가 => 추가한 상태를 상태 관리 로직 reducer.js에 변경 추가, action.js에서 actionCreater에 추가
// => 메인 함수(app.js)에서 추가한 액션 실행

// 즉, 과정에서 redux를 건드릴 필요가 없이 action과 reducer에서 새로 추가된 ACTION을 넣어주기만 하면 작동한다.

export const INCREASE_COUNTER = 'increase counter';
export const ASYNC_INCREASE_COUNTER = 'async increase counter';
export const DECREASE_COUNTER = 'decrease counter';
export const SET_COUNTER = 'set counter';