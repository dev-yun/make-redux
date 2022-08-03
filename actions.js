import * as ActionType from "./action-types";
import { actionCreator } from "./redux";

// curry 된 부분에서 type을 입력하여 payload를 입력받는 함수를 반환한다.
export const increase = actionCreator(ActionType.INCREASE);
export const decrease = actionCreator(ActionType.DECREASE);
export const reset = actionCreator(ActionType.RESET);