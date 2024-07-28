# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## 과제 요구 사항

# Step1

- [] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축해요.
- [] MSW를 사용하여 Mock API가 동작하도록 해요. (상세 API / 옵션 API)
- [] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성해요.
- [] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성해요.
- [] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성해요.
- [] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성해요. (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 해요)
- [] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성해요.

# Step2

- [] 로그인 기능을 구현해요.
- [] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현해요. (회원가입을 하면 로그인이 되게 해요.)
- [] 회원가입 버튼은 로그인 화면 하단에 배치해요. 로그인 화면을 그대로 사용해도 괜찮아요.
- [] 상품 상세 페이지에서 관심 등록 버튼을 만들어요.
- [] 상품 상세 페이지에서 관심 버튼을 클릭 했을 때 관심 추가 동작되게 해요.
- [] 관심 등록 성공 시 Alert로 "관심 등록 완료" 메시지를 노출해요.
- [] 나의 계정 페이지에서 관심 목록 리스트를 만들어요.
- [] 관심 목록 리스트는 chakra UI를 사용하여 자유롭게 만들어주세요.
- [] 관심 목록 API는 카카오테크 선물하기 API 노션의 response 데이터를 사용해요.
- [] 관심 목록 리스트에서 관심 삭제가 가능하게 해요.
- [] 관심 삭제 시 목록에서 사라져요.


# step3
- 질문 1. Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.


    Test code를 작성하면서 함수들의 관계를 더욱 고민하게 되고 사용자의 입장에서 고민해볼 수 있어서 좋았습니다. 아쉬웠던 점은 jest 환경설정 부분에서 test 코드가 잘 작동하지 않아서 힘들었습니다. 또한 통합테스트를 작성할때 어떤 부분을 테스트 해야하는지 확신이 들지 않았고 어려웠습니다.




- 질문 2. 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.


    제가 생각했을때 좋은 컴포넌트란 변경을 최소화하여 재사용 할 수 있는 컴포넌트라고 생각합니다. 
    변경을 최소화하여 코드의 복잡성을 줄이고 재사용이 더 용이해지기 때문입니다.




- 질문 3. 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.

    컴포넌트가 동일한 방식으로 동작하고 일관된 UI를 가지는 일관성과 다양한 상황에 따라 맞춤 스타일을 제공하는 유연성이 중요하다고 생각합니다. 컴포넌트의 재사용을 더욱 용이하게 해주고 이를 통해 코드를 더욱 간단하게 작성할 수 있기 때문입니다.

