# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

### 실행 방법
```
git clone https://github.com/ychy61/react-product-login week5
git checkout ychy61
cd week5
npm install
npm run start
```
## step0 - 기본 코드 준비

[🔗 link](https://edu.nextstep.camp/s/hazAC9xa/ls/aanqRobF)

## step1 - Form 부분 테스트 코드 작성하기

[🔗 link](https://edu.nextstep.camp/s/hazAC9xa/ls/e6jPlo5D)
- Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축
- MSW를 사용하여 Mock API가 동작하도록 함
- 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성

### 기능 요구 사항

- [ ] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성
- [ ] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성
    - [ ] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성
    - [ ] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성