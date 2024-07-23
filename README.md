# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

# 📝 기능 구현 목록

## step 1

- [x] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축해요.
- [ ] MSW를 사용하여 Mock API가 동작하도록 해요. (상세 API / 옵션 API)
- [ ] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성해요.
- [ ] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성해요.
- [ ] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성해요.
  - [ ] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성해요. (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 해요)
  - [ ] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성해요.

## step 2

- [ ] 로그인 기능을 구현해요.
- [ ] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현해요. (회원가입을 하면 로그인이 되게 해요.)
  - 회원가입 버튼은 로그인 화면 하단에 배치해요. 로그인 화면을 그대로 사용해도 괜찮아요.
- [ ] 상품 상세 페이지에서 관심 등록 버튼을 만들어요.
- [ ] 상품 상세 페이지에서 관심 버튼을 클릭 했을 때 관심 추가 동작되게 해요.
  - 관심 등록 성공 시 Alert로 "관심 등록 완료" 메시지를 노출해요.
- [ ] 마이 페이지에서 관심 목록 리스트를 만들어요.
  - [ ] 관심 목록 리스트는 chakra UI를 사용하여 자유롭게 만들어주세요.
  - [ ] 관심 목록 API는 카카오테크 선물하기 API 노션의 response 데이터를 사용해요.
- [ ] 관심 목록 리스트에서 관심 삭제가 가능하게 해요.
  - 관심 삭제 시 목록에서 사라져요.
