import { createStore } from './redux.js';
import  reducer  from './reducer.js';
import * as Actions from './actions.js';

const store = createStore(reducer);

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
