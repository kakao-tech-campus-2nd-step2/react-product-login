# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## STEP1

- [x] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축
- [x] MSW를 사용하여 Mock API가 동작하도록 하기 (상세 API / 옵션 API)
- [x] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성하기
- [x] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성하기
- [x] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성하기
  - [x] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성하기 (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 함)
  - [x] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성하기

## STEP2

- [x] 로그인 기능 구현
- [x] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현 (회원가입을 하면 로그인이 되게 함)
  - 회원가입 버튼은 로그인 화면 하단에 배치
- [x] 상품 상세 페이지에서 관심 등록 버튼 생성
- [x] 상품 상세 페이지에서 관심 버튼을 클릭 했을 때 관심 추가 동작되게 하기
  - 관심 등록 성공 시 Alert로 "관심 등록 완료" 메시지를 노출
- [x] 마이 페이지에서 관심 목록 리스트를 만들기
  - [x] 관심 목록 리스트는 chakra UI를 사용하여 자유롭게 만들기
  - [x] 관심 목록 API는 카카오테크 선물하기 API 노션의 response 데이터를 사용
- [x] 관심 목록 리스트에서 관심 삭제가 가능하게 하기
- [x] 관심 삭제 시 목록에서 사라짐

## STEP3

- 질문 1. Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.
  - 테스트코드를 작성함으로서 내가 코드를 제대로 짰는지 확인할 수 있어서 좋았던 동시에 어떤 코드까지 테스트코드를 작성해야할지 고민이 됐다.
- 질문 2. 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.
  - 좋은 컴포넌트란 자주 사용되는 항목을 확장성 있게 잘 만드는 것이라고 생각한다. 코드를 짜기 전 어떤 것들을 컴포넌트로 짜야할지 먼저 고민하는 습관이 생겼다.
- 질문 3. 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.
  - 확장성 : 여러 코드에서 사용할 수 있도록 구성해야 ui나 기능면에서의 통일성이 생기기 때문이다.
  - 컴포넌트 선택 : 자주 사용되지 않는 요소를 컴포넌트로 만들면 파일구조만 복잡해지고 자주 사용되지는 않기 때문이다.

