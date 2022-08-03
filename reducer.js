// 상태 변경 로직은 매우 많으므로 따로 분리

// Redux에서는 상태 변경 함수의 인자에 얕은 복사를 사용하기 때문에 2depth 이상의 구조는 사용하지 않길 권장한다.
// 상태변화함수에는 Redux의 컨벤션이 적용되는데, 첫번째 인자로는 state, 두번째 인자로는 action 객체가 넘어온다.

const InitializeState = { count : 0 }
export function reducer(state = InitializeState , action) {
    
    // 상태를 입력받았을때 만약 상태 처리를 비동기적으로 한다면 Reducer의 구조상 비동기 호출이 끝나기전에 return되어 undefined가 반환된다.
    // 때문에 reducer에서 비동기를 처리하지 않고 다른 방법을 사용한다. (미들웨어 아키텍처를 만들어 reducer 외부에서 해결한다.)
    // redux는 reducer가 순수함수이길 바라기 때문이다. (순수함수란 입력이 같으면 항상 같은 출력을 내보내는 함수이고 이를 위해선 외부에 의존성이 있으면 안된다. (비동기는 성공할때도, 실패할때도 있으므로 같은 입력이라도 출력이 달라질 수 있다.))
    switch(action.type){
      case 'increase':
        return { ...state, count : state.count + 1 };
      case 'decrease':
        return { ...state, count : state.count - 1 };
      case 'reset':
        // reset을 서버로부터 비동기적으로 받아와 reset할지 결정하는 함수를 reducer내부에 사용할 수 없다. (비동기 코드이기 때문에)
        // fetch('/reset')
        //   .then(response => response.json())
        //   .then(result => {
        //     if(result) {
        //       return { ...state, count : 0 }; 
        //     }
        //   })
        return { ...state, count : 0 };
      default:
        return { ...state };  
    }
}