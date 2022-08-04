import { createStore } from './redux.js';
import  reducer  from './reducer.js';
import * as Actions from './actions.js';
import { logger } from './logger.js';
import { ASYNC_DECREASE_COUNTER, ASYNC_INCREASE_COUNTER } from './action-types.js';

const asyncRouter = jobs => store => next => action => {
    const matchJob = Object.entries(jobs).find(([type]) => action.type === type);

    if(matchJob){
        matchJob[1](store, action);
    } else {
        next(action)
    }
}

const asyncJobs = {
    [ASYNC_INCREASE_COUNTER]: function (store, action) {
        store.dispatch(Actions.asyncRequest());
        setTimeout(() => {
            store.dispatch(Actions.increase(20));
            store.dispatch(Actions.asyncResponse());
        }, 3000)
        
    },
    [ASYNC_DECREASE_COUNTER]: function (store, action) {
        store.dispatch(Actions.asyncRequest());
        setTimeout(() => {
            store.dispatch(Actions.decrease(40));
            store.dispatch(Actions.asyncResponse());
        }, 3000)
        
    },
}

const store = createStore(reducer, [logger, asyncRouter(asyncJobs)]);

const counterDisplay = document.querySelector('#counter');
const loadingMessage = document.querySelector('#loading');
const btnIncrease = document.querySelector('#btn-increase');
const btnAsyncIncrease = document.querySelector('#btn-async-increase');
const btnAsyncDecrease = document.querySelector('#btn-async-decrease');
const btnDecrease = document.querySelector('#btn-decrease');
const btnReset = document.querySelector('#btn-reset');

// 구독 발행 모델 호출
store.subscribe(function() {
  const { counter, request } = store.getState();

  loadingMessage.style.visibility = request ? 'visible' : "hidden";
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

btnAsyncDecrease.addEventListener('click', () => {
    store.dispatch(Actions.asyncDecrease({ url: '/async-decrease' }));
  });