# react-product-login
FE 카카오 선물하기 5주차 과제: 로그인 및 관심목록(with. 테스트코드)
### 🌱 1단계 - Form 부분 테스트 코드 작성
- [X] `Jest`와 `React Testing Library`를 사용하여 테스트 기반 환경 구축
- [X] `MSW`를 사용하여 Mock API가 동작하도록 작성
- [X] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위 테스트 코드 작성
- [X] 상품 상세 페이지와 관련된 통합 테스트 코드 작성
- [X] 결제하기 페이지의 Form과 관련된 통합 테스트 코드 작성
	- [X] 현금 영수증 Checkbox가 false인 경우 현금 영수증 종류, 현금 영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드 작성(만약 true인 경우 현금 영수증 종류, 번호 field에 값이 입력되어야 함)
	- [X] Form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드 작성
### 🪴 2단계 - 로그인, 관심 상품 등록 / 삭제, 관심 목록 구현
- [X] 로그인 기능 구현
- [X] 회원가입 화면을 만들고, 회원가입 기능이 동작되도록 구현(회원가입을 하면 로그인이 되도록)
	- 회원가입 버튼은 로그인 화면 하단에 배치
- [X] 상품 상세 페이지에 관심 버튼 추가
	- 관심 등록 성공 시 alert로 "관심 등록 완료" 메시지 노출
- [X] 마이 페이지에 관심 목록 리스트 추가
	- 관심 목록 리스트는 chakra UI를 사용하여 자유롭게 생성
	- 관심 목록 API는 카카오테크 선물하기 API 노션의 response 데이터 사용
- [ ] 관심 목록 리스트에서 관심 삭제가 가능하도록 구현
	- 관심 삭제 시 목록에서 사라짐