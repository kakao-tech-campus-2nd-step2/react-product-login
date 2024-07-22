# React Product Login

## 개요

본 저장소는 5주차 과제 (2024-07-22 ~ 2024-07-16)를 위한 로그인 및 관심목록 구현을 담고 있습니다. 상세한 학습 내용은 [Notion 노트](https://www.notion.so/TIL-FE-25dbeb894e884b889eca0fa3e4e13904)에서 확인할 수 있습니다.

---

## 0단계 - 기본 코드 준비

## 1단계 - Form 부분 테스트 코드 작성하기

- Jest와 React Testing Library를 사용하여 테스트 기반 환경을 구축합니다.
- MSW를 사용하여 Mock API가 동작하도록 합니다. (상세 API / 옵션 API)
- 단위 테스트가 필요하다면 단위 테스트 코드를 작성합니다.
- 상품 상세 페이지와 관련된 통합 테스트 코드를 작성합니다.
- 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성합니다.
- 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성합니다. (true인 경우 현금영수증 종류, 번호 field에 값이 입력되어야 합니다.)
- form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성합니다.
- 본인만의 기준으로 일관된 코드를 작성합니다.
- 기능 단위로 나누어 커밋을 합니다.

## 2단계 - 로그인, 관심 상품 등록 / 삭제, 관심 목록 구현

- 로그인 기능을 구현합니다.
- 회원가입 화면을 만들고, 회원가입 기능이 동작하도록 구현합니다. (회원가입을 하면 로그인이 되도록 합니다.)
  - 회원가입 버튼은 로그인 화면 하단에 배치합니다. 로그인 화면을 그대로 사용해도 괜찮습니다.
- 상품 상세 페이지에서 관심 등록 버튼을 만듭니다.
  - 상품 상세 페이지에서 관심 버튼을 클릭했을 때 관심 추가가 동작하도록 합니다.
  - 관심 등록 성공 시 Alert로 "관심 등록 완료" 메시지를 노출합니다.
- 마이 페이지에서 관심 목록 리스트를 만듭니다.
  - 관심 목록 리스트는 Chakra UI를 사용하여 자유롭게 만듭니다.
  - 관심 목록 API는 카카오테크 선물하기 API 노션의 response 데이터를 사용합니다.
  - 관심 목록 리스트에서 관심 삭제가 가능하도록 합니다.
  - 관심 삭제 시 목록에서 사라집니다.
- 본인만의 기준으로 일관된 코드를 작성합니다.
- 기능 단위로 나누어 커밋을 합니다.

## 3단계 - 질문의 답변을 README에 작성

- **질문 1**: Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.
- **질문 2**: 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.
- **질문 3**: 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.