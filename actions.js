import { actionCreator } from "./redux.js";
import * as Actions from "./action-types.js";


// curry 된 부분에서 type을 입력하여 payload를 입력받는 함수를 반환한다.
export const increase = actionCreator(Actions.INCREASE_COUNTER);
export const asyncIncrease = actionCreator(Actions.ASYNC_INCREASE_COUNTER);
export const asyncDecrease = actionCreator(Actions.ASYNC_DECREASE_COUNTER);
export const decrease = actionCreator(Actions.DECREASE_COUNTER);
export const setCounter = actionCreator(Actions.SET_COUNTER);
export const asyncRequest = actionCreator(Actions.ASYNC_REQUEST);
export const asyncResponse = actionCreator(Actions.ASYNC_RESPONSE);
