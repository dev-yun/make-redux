export const logger = store => next => action => {
    const prevState = store.getState();
    
    // 하위 console.log를 접고 타이틀을 주는 역할
    console.groupCollapsed('action logger => ', action.type);
    console.log("prev State : ", prevState);
    console.log("action payload : ", action.payload);
    console.groupEnd();

    next(action);
};

