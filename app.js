import { createStore } from './redux.js';
import  reducer  from './reducer.js';
import * as Actions from './actions.js';
import { ASYNC_INCREASE_COUNTER, SET_COUNTER } from './action-types.js';

// middleware는 N개가 존재할 수 있고 redux 데이터 흐름에 따라 action을 받는다.
// 때문에 action을 받는 것 외에도 action을 넘겨주는 작업을 해야한다. 
const middleware1 = store => next => action => {
    console.log("m1 =>", action);
    next(action);
}

const middleware2 = store => next => action => {
    console.log("m2 =>", action);
    if(action.type === SET_COUNTER){
        action.payload = 10000;
    }
    next(action);
}

const middleware3 = store => next => action => {
    console.log("m3 =>", action);
    if(action.type === ASYNC_INCREASE_COUNTER){
        setTimeout(() => {
            next(Actions.increase());
        }, 1000)
    }else{
        next(action)
    }
};

const middleware4 = store => next => action => {
    console.log("m4 =>", action);
    next(action);
}


const store = createStore(reducer, [middleware1, middleware2, middleware3, middleware4]);

const counterDisplay = document.querySelector('#counter');
const btnIncrease = document.querySelector('#btn-increase');
const btnAsyncIncrease = document.querySelector('#btn-async-increase');
const btnDecrease = document.querySelector('#btn-decrease');
const btnReset = document.querySelector('#btn-reset');

// 구독 발행 모델 호출
store.subscribe(function() {
  const { counter } = store.getState();

  counterDisplay.textContent = counter;
});

store.dispatch(Actions.setCounter(100));

btnReset.addEventListener('click', () => {
  store.dispatch(Actions.setCounter(0));
});

btnIncrease.addEventListener('click', () => {
  store.dispatch(Actions.increase());
});

btnAsyncIncrease.addEventListener('click', () => {
  store.dispatch(Actions.asyncIncrease({ url: '/async-increase' }));
});

btnDecrease.addEventListener('click', () => {
  store.dispatch(Actions.decrease());
});
