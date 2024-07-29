# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

### 질문 1. Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.

#### 좋았던 점

- 테스트 코드를 작성하면서 코드가 어떻게 동작할지 명확하게 정의할 수 있었다.
- 이후 코드를 수정하더라도, 테스트 코드를 이용하여 해당 컴포넌트들이 제대로 동작하는지 확인할 수 있어서 유용할 것이라고 생각했다.

#### 아쉬웠던 점

- 테스트 코드를 처음 작성해보는 것이다보니 테스트 코드를 작성하는 데 시간이 매우 많이 소요되었다.
- 여러 부분을 더욱 세밀하게 테스트한다고 하면 시간이 더욱 소요될 것이므로 비용이 많이 들 수도 있겠다는 생각을 하였다.

### 질문 2. 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.

- 좋은 컴포넌트를 구분하는 가장 중요한 기준으로는 재사용성과 유지보수성이라고 생각한다.
- 다양한 상황에서 재사용될 수 있는 컴포넌트는 코드의 중복을 줄여주므로 개발 시간이 절약되고 코드를 관리하기 쉬워지기 때문이다.
- 하나의 명확한 기능을 담당하여 유지보수성을 높여주는 컴포넌트의 경우, 컴포넌트를 이해하고 수정하기 쉬우며 테스트 하기도 쉽기 때문이다.

### 질문 3. 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.

- 공통 컴포넌트에서 가장 중요한 요소는 일관성과 확장성이라고 생각한다.
- 공통 컴포넌트는 전체 애플리케이션에서 일관된 UX와 디자인을 제공해야 한다. 그러므로 동작 패턴이나 인터페이스가 일관되게 유지되도록 해야한다고 생각한다.
- 공통 컴포넌트는 다양한 요구사항에서 사용되므로, 기본적인 구조는 단순하되 props, configuration을 통해 기능을 확장할 수 있도록 만드는 것이 중요하다고 생각한다.
