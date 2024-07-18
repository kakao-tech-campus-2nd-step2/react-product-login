# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## Week 4. 1단계 - 상품 상세 페이지, 상품 결제하기 Form 구현하기

### 📝 요구사항

- 상세 페이지 및 상품 결제 페이지의 UI를 구현한다.
  - UI는 chakra-ui 사용해서 구현한다.
  - 단, 직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지
  - UI 구현에 어려움을 겪는다면 임의로 변경해도 됨
- 상세 페이지에서 첨부된 oas.yaml 파일의 /api/v1/products/{productId}/detail, /api/v1/products/{productId}/options를 참고하여 API를 구현한다.
  - 없는 상품의 경우 메인 페이지로 연결되도록 한다.
  - 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동한다.
- React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현한다.

### 🚀 구현할 기능 목록

#### 페이지 ui

- [x] 상세 페이지
  - 추가한 컴포넌트: Card, Divider, Text
- [x] 결제 페이지
  - 추가한 컴포넌트: Checkbox, Select, TextArea

#### api 연결

- [x] 상품 상세 정보
  - /api/v1/products/{productId}/detail
- [x] 상품 옵션 정보
  - /api/v1/products/{productId}/options

#### 리다이렉트 처리

- [x] 없는 상품의 경우 메인 페이지로 연결하기
  - 서버에 해당 productId가 없으면 500 에러 반환
- [x] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동
  - 로그인이 되어있지 않은데 Order 페이지 이동 시 메인페이지로 이동

#### form 로직 구현

- [x] 결제 페이지의 order form

#### 선택한 상품 상태관리

- [x] -, + 버튼 클릭 시 개수 조절하기
- [x] 선물하기 버튼 클릭 시 브라우저 state에 해당 상품 내용 저장
  - productId, 개수
