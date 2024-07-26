# **경북대 FE\_정솔빈\_2주차 과제 Week 3**

## 1단계 - Form 부분 테스트 코드 작성하기

**구현 목록:**

- [x] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축
- [x] MSW를 사용하여 Mock API가 동작하도록 하기 (상세 API / 옵션 API)
- [x] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성
- [ ] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성
  - [x] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성 (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력)
  - [ ] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성

## 2단계 - 로그인, 관심 상품 등록 / 삭제, 관심 목록 구현

**구현 목록:**

- [x] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현 (회원가입을 하면 로그인이 되도록), 회원가입 버튼은 로그인 화면 하단에 배치하기
- [x] 상품 상세 페이지에서 관심 등록 버튼을 만들기
- [x] 상품 상세 페이지에서 관심 버튼을 클릭 했을 때 Alert로 "관심 등록 완료" 메시지를 노출
- [x] 관심 목록 리스트를 만들기
- [x] 관심 목록 리스트에서 관심 삭제 기능 만들기 (목록에서도 사라지도록)

**과제 수행 중 궁금한 점**
위시리스트(관심 목록 리스트) 페이지에서 분명히 처음 시도할 때 위시리스트의 목록이 아무것도 나오지 않고 '위시리스트가 비어 있습니다' 문구가 출력되었습니다. 여러 개의 좋아요 버튼을 눌렀을 때 위시리스트가 작동하는지 확인하려고 여러 상품을 좋아요를 누르고 위시리스트 목록에서 좋아요를 해제해 봤는데 하나의 항목만 사라지고 나머지 항목은 그대로 남아 있으며 새로고침을 해도 상품 목록에서 지워지지 않습니다. 현재 상품 상세 페이지에 모두 같은 내용은 상품들이 있어서 그런걸까요? 어떻게 수정하면 좋을까요?

## 3단계 - 질문의 답변을 README에 작성

- **질문 1. Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.**
  체크박스 클릭 시 현금영수증 필드의 활성화/비활성화를 테스트한 점은 사용자의 상호작용에 따른 UI 변화가 제대로 동작하는지 확인하는 데 유용했습니다.
  test code를 작성하는 과정에서 모듈 파일 경로 문제와 axios 에러가 발생했고 이 부분에 대해서 해결하는데 오랜 시간이 걸렸습니다. 에러 메시지를 findByText로 검증하면서 정확한 타이밍에 오류 메세지를 못 찾을 수 있다고 생각합니다. 또한 2단계 과제를 수행하다보니 다시 로그인 리디엑션 test가 Fail되었습니다. 실제 코드에서는 잘 작동하는데 test code에서 Fail되지 않도록 다시 수정해보겠습니다.
