# WEEK5

jest, test-library, 그리고 MSW와 Mocks를 사용하여 테스트 코드 작성하기

## ✨project 실행

```
npm install
npm run start
```

## ✨test 실행

```
npm install
npm (run) test
```

## STEP1

### 📜Requirements

- [x] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축
- MSW를 사용하여 Mock API가 동작하도록 함.
  - [x] 상세 API
  - [x] 옵션 API
- [x] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성
- [x] 상품 상세 페이지 통합 테스트 코드 작성
- 결제하기 페이지의 Form 통합 테스트 코드 작성
  - [x] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성 (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 함.)
  - [x] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드 작성

## STEP2

### 📜Requirements

- [ ] 로그인 기능 구현
- [x] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현
  - 회원가입 버튼은 로그인 화면 하단에 배치한다.
- [ ] 상품 상세 페이지 관심 등록 버튼 구현
- [ ] 관심 버튼을 클릭했을 때 관심 추가 동작이 되게 한다.
  - 관심 등록 성공 시 Alert로 "관심 등록 완료" 메시지를 노출
- [ ] 마이 페이지에서 관심 목록 리스트 생성
  - [ ] chakra UI를 사용하여 UI 구현
  - [ ] 노션 API의 response 데이터 사용
- [ ] 관심 목록 리스트 관심 삭제 기능 구현
  - 삭제시 목록에서 제거되도록 함.
