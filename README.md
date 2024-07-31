# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

#### 🚀 0단계 - 기본 코드 준비

- [x] 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.

#### 🚀 1단계 - Form 부분 테스트 코드 작성하기

- [x] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축해요.

- [x] MSW를 사용하여 Mock API가 동작하도록 해요. (상세 API / 옵션 API)

- [x] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성해요.

- [x] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성해요.

- [ ] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성해요.

- [ ] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성해요. (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 해요)

- [ ] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성해요.

#### 🚀 2단계 - 로그인, 관심 상품 등록 / 삭제, 관심 목록 구현

- [x] 로그인 기능을 구현해요.

- [x] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현해요. (회원가입을 하면 로그인이 되게 해요.)

- [x] 상품 상세 페이지에서 관심 등록 버튼을 만들어요.

- [x] 상품 상세 페이지에서 관심 버튼을 클릭 했을 때 관심 추가 동작되게 해요.

- [x] 마이 페이지에서 관심 목록 리스트를 만들어요.

- [x] 관심 목록 리스트에서 관심 삭제가 가능하게 해요.

#### 🚀 3단계 - 질문의 답변을 README에 작성

- [x] 질문 1. Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.
      답변 : 테스트 코드를 실행하기 위해서 MSW 서버(워커) 설정과 테스트 환경 설정하는 부분이 어려웠고, 오류 해결에 시간을 많이 썼던 것 같습니다. 또, 테스트 코드의 틀을 어떤 식으로 짜고 어떤 쿼리와 함수를 사용해서 테스트를 해야하는 지 구글링과 챗지피티를 이용해 찾아보고 이해해보고자 했지만 후에 테스트에 오류가 발생했을 때 왜 오류가 발생하는 지 에러 로그만 보고 이해하고 해결하고자 하는 게 어려웠습니다.

- [x] 질문 2. 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.
      답변 : 좋은 컴포넌트란 재사용성이 보장되어야 된다고 생각하고, 너무 많은 종속성에 얽혀 props 를 넘겨받는 상황이 생기면 안된다고 생각합니다. 또한 이번 테스트 코드 작성을 진행하면서 컴포넌트를 후에 테스트할 때 테스트가 용이하도록 해야한다고 생각했습니다.
      예로 Form 컴포넌트는 제출 시 발생하는 이벤트를 명확히 테스트할 수 있도록 만들어야 한다고
      생각했습니다.

- [x] 질문 3. 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.

  답변 : 제일 중요하게 생각하는 부분은 가독성이었습니다. 컴포넌트의 코드와 구조는 가독성이 좋아야 한다고 생각하고, 이전에 제가 작성한 코드들은 가독성이 좋지 않았습니다. 통일성도
  지켜지지 않았고, 하나를 수정하면 그에 연관된 다른 파일들을 찾는 데 난해함을 느꼈습니다.
  두 번째는 컴포넌트의 분리성이었습니다. 재사용할 경우가 거의 없는 컴포넌트는 오히려 세부적으로 분리해 작성하게 되면 무분별하게 파일과 디렉토리들이 생기게 되고 그렇게 된다면
  코드를 유지보수하는 데 있어서 파일을 찾는 데만 시간을 너무 소비하는 것 같습니다.
  하지만 너무 컴포넌트를 분리하지 않는다면 후에 코드를 작성하는 데 반복되는 코드 부분들이
  생겨 이 또한 좋은 코드가 아니라 생각합니다.
