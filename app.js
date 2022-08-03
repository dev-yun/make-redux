import { createStore } from './redux.js';
import { reducer } from './reducer.js';
import * as Actions from './actions.js';

const store = createStore(reducer);

// 데이터가 변할때마다 구독기가 호출되어 state 값을 호출한다.
store.subscribe(function() {
    console.log(store.getState())
})

// action을 함수로 분리하고 명확한 네이밍을 줬다.
store.dispath(Actions.increase());
store.dispath(Actions.increase());
store.dispath(Actions.increase());
store.dispath(Actions.reset());
store.dispath(Actions.decrease());
store.dispath(Actions.increase());