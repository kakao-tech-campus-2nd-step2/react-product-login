# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## 1단계 - Form 부분 테스트 코드 작성하기

- [x] Jest와 React Testing Library를 사용한 테스트 환경 구축
- [x] MSW를 사용해 Mock API 동작하도록 하기
- [x] 상품 상세 페이지와 관련된 통합 테스트 코드 작성
- [x] 결제하기 페이지 Form와 관련된 통합 테스트 코드 작성
  - [x] 현금영수증 확인 테스트 코드
  - [x] form validation 로직 확인 테스트 코드

## 2단계 - 로그인, 관심 상품 등록 / 삭제, 관심 목록 구현

- [x] 로그인 기능 구현
  - mock data로 로그인 가능 (id: test@test.com, password: test1234)
- [x] 회원가입 화면 작성 및 기능 동작 구현
- [x] 상품 상세 페이지에 관심 등록 버튼 작성 및 관심 추가 동작 구현
- [x] 나의 계정 페이지에 관심 목록 리스트 작성
- [x] 관심 목록 리스트에 관심 삭제 기능 구현

## 3단계 - 질문의 답변을 README에 작성

### 질문 1: Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.

- 좋았던 점
  - 테스트 코드가 성공적으로 통과하면, 코드가 예상대로 잘 작동한다는 확인을 할 수 있어 안정성을 향상시킬 수 있었습니다.
  - 리팩토링을 할 때 테스트가 있으면, 코드가 리팩토링 후에도 잘 작동하는지 확인 할 수 있어 편리했습니다.
- 아쉬웠던 점
  - 테스트 코드를 처음 작성 할 때는 환경 설정과 어떤 부분을 어떻게 테스트해야할지를 생각하는 것이 어려웠습니다.

### 질문 2: 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.

- 재사용성이 높아야한다고 생각합니다.
- 하나의 컴포넌트는 하나의 기능 또는 책임을 가지고, 복잡한 기능은 여러 컴포넌트로 나누어서 구현해야한다고 생각합니다.
- 가독성이 좋아야한다고 생각합니다. 변수명이 명확하고, 일관된 코드 스타일을 유지하고, 적절한 주석을 사용해 가독성을 높여 이해하기 쉽도록 하는 것이 개발과 리뷰를 더 효과적으로 진행할 수 있을 것 같습니다.

### 질문 3: 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.

1. 명확한 기능/역할: 해당 공통 컴포넌트의 역할의 경계가 명확해야 가독성 및 유지보수성이 좋아지므로, 공통 컴포넌트를 만들 때 만능 컴포넌트를 지양하고 명확한 역할을 가지도록 만들어야한다고 생각합니다.
2. 재사용성: 공통 컴포넌트는 프로젝트에서 여러 부분에서 재사용되기 때문에 한 번 작성한 컴포넌트가 여러 곳에서 사용가능하도록 만드는 것이 좋을 것 같습니다. 무작정 확장시키는 것이 아닌, 컴포넌트의 명확한 역할, 경계 내에서 인터페이스 등을 활용해 확장성을 확보하도록 해야합니다. 재사용성이 높으면 코드 중복을 줄이고, 개발을 효율적으로 할 수 있을 것입니다.
