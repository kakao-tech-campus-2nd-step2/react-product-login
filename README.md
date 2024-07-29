# React Product msw

## 개요

본 저장소는 5주차 과제 (2024-07-22 ~ 2024-07-16)를 위한 로그인 및 관심목록 구현을 담고 있습니다. 상세한 학습 내용은 [Notion 노트](https://www.notion.so/TIL-FE-25dbeb894e884b889eca0fa3e4e13904)에서 확인할 수 있습니다.

---

## 0단계 - 기본 코드 준비

- [x]  기본 코드 준비

---

## 1단계 - Form 부분 테스트 코드 작성하기

### 테스트 기반 환경 구축

- [x] Jest 테스트 환경 설정
- [x] React Testing Library 테스트 환경 설정

### MSW를 사용하여 Mock API 설정

- [x] 상세 API 엔드포인트 추가
- [x] 옵션 API 엔드포인트 추가

### 단위 테스트 작성

- CashReceiptFields 컴포넌트
  - [x] 렌더링 테스트: 현금영수증 관련 입력 컴포넌트(체크박스, 셀렉트, input)가 화면에 정상적으로 표시되는지 확인
  - [x] 사용자 상호작용 테스트: 체크박스 클릭, 셀렉트 옵션 선택, input 값 입력 등 사용자 입력에 대한 테스트
- MessageCardFields 컴포넌트
  - [x] 렌더링 테스트: 메시지 카드 입력 textarea가 화면에 정상적으로 표시되는지 확인
  - [x] 사용자 입력 테스트: textarea에 메시지 입력 후 값이 제대로 반영되는지 확인

### 통합 테스트 작성

- 상품 상세 페이지
  - [x] useGetCategorys.test
  - [x] useGetProducts.test
  - [x] useGetProductDetail.test
  - [x] useGetProductOptions.test

- 결제하기 페이지
  - 현금영수증
    - [x] Checkbox 상태에 따른 필드 활성화/비활성화 테스트
    - [x] Checkbox가 `true`인 경우 필드 값 입력 테스트
  - Form
    - [x] 필수 입력 필드 검사
    - [x] 입력 값 형식 검사

## 2단계 - 로그인, 관심 상품 등록 / 삭제, 관심 목록 구현

- 계정 관리
  - [x] 로그인 기능 구현
  - [x] 회원가입 버튼 UI 구현: 로그인 화면 하단에 회원가입 버튼 배치
  - [x] 회원가입 버튼 로직 구현: 버튼 클릭 시 회원가입 페이지로 이동
  - [x] 회원가입 UI 구현: 로그인 UI 참고 및 사용
  - [x] 회원가입 로직 구현: 회원가입 성공 시 로그인 페이지로 이동 및 성공 메시지 표시
  
- 상품 상세 페이지
  - [ ] 관심 등록 버튼 UI 구현
  - [ ] 관심 등록 버튼 로직 구현: 관심 등록 성공 시 "관심 등록 완료" Alert 메시지 표시

- 마이 페이지
  - [ ] 관심 목록 리스트 UI 구현: Chakra UI 컴포넌트 활용
  - [ ] 관심 목록 API 활용: 선물하기 API 노션의 response 데이터 활용
  - [ ] 관심 목록 리스트 로직 구현: 관심 삭제 성공 시 해당 항목 리스트에서 제거

---

## 3단계 - 질문의 답변을 README에 작성

- **질문 1**: Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.
- **질문 2**: 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.
- **질문 3**: 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.