# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## Step 1 📝요구사항
### 테스트 코드 작성하기

- [ ] Jest와 React Testing Libaray를 사용하여 테스트 기반 환경을 구축해요.
- [ ] MSW를 사용하여 Mock API가 동작하도록 해요. (상세 API / 옵션 API)
- [ ] 단위 테스트로 작성하면 좋을 테스트가 있다면 단위테스트 코드를 작성해요.
- [ ] 상품 상세 페이지와 관련된 통합 테스트 코드를 작성해요.
- [ ] 결제하기 페이지의 Form과 관련된 통합 테스트 코드를 작성해요.
  - [ ] 현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인하는 테스트 코드를 작성해요. (만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 해요)
  - [ ] form의 validation 로직이 정상 동작하는지 확인하는 테스트 코드를 작성해요.
- [ ] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [ ] 기능 단위로 나누어 커밋을 해주세요.

## Step 2 📝요구사항
- [ ] 로그인 기능을 구현해요.
  - [ ] 회원가입 화면을 만들고, 회원가입 기능이 동작되게 구현해요. (회원가입을 하면 로그인이 되게 해요.)
  - [ ] 회원가입 버튼은 로그인 화면 하단에 배치해요. 로그인 화면을 그대로 사용해도 괜찮아요.
- [ ] 상품 상세 페이지에서 관심 등록 버튼을 만들어요.
  - [ ] 상품 상세 페이지에서 관심 버튼을 클릭 했을 때 관심 추가 동작되게 해요.
  - [ ] 관심 등록 성공 시 Alert로 "관심 등록 완료" 메시지를 노출해요.
- [ ] 나의 계정 페이지에서 관심 목록 리스트를 만들어요.
  - [ ] 관심 목록 리스트는 chakra UI를 사용하여 자유롭게 만들어주세요.
  - [ ] 관심 목록 API는 카카오테크 선물하기 API 노션의 response 데이터를 사용해요.
  - [ ] 관심 목록 리스트에서 관심 삭제가 가능하게 해요.
  - [ ] 관심 삭제 시 목록에서 사라져요.

  ## Step 3 📝질문 답변 
  ### 🧐 질문 1. Test code를 작성해보면서 좋았던 점과 아쉬웠던 점에 대해 말해주세요.
  테스트 코드를 처음 짜봐서 테스트 코드를 직접 다뤄보는 것만으로도 새로운 경험이었다. 아쉬운점이 있다면, 빌드 환경 설정하는데 있어서 아직 깊은 지식이 없어 환경 설정에 많은 시간을 썼고, 거기서 힘을 써 막상 테스트 코드를 작성해보는데 있어서는 더 집중하지 못한 것 같았다. 테스트 코드를 짜는데 있어서 단위 테스트와 통합 테스트를 나눠서 하는데 어느 단위로 나눠서 해야하나 고민이 들었는데, 유의미한 기능을 잘 판단하는 것이 중요하다는 생각이 들었다.

  ### 🧐 질문 2. 스스로 생각했을 때 좋은 컴포넌트란 무엇인지 본인만의 기준을 세우고 설명해 주세요.
  테스트 코드를 짜면서 컴포넌트에 대한 고민이 있었다. 컴포넌트가 기능별로 잘 나누어져 있어야지 테스트 코드를 짤 때도 편리할 것 이라는 생각이 들었고,
  한 컴포넌트가 하나의 기능을 담아 그 기능이 명확하게 보이면 좋은 컴포넌드가 될 것이라는 생각이 들었다. 또 아직 미숙하기에 코드가 여러줄이 되고 복잡해진다면 이해하기가 어려워서 너무 코드의 볼륨이 커진다면 더 작은 기능단위로 나눠서 짜는 것이 좋다고 생각한다.


  ### 🧐 질문 3. 스스로 생각했을 때 공통 컴포넌트를 만들 때 가장 중요한 요소 2개를 선택하고 이유와 함께 설명해주세요.
  1. 재사용 가능성
  공통 컴포넌트를 만드는 가장 큰 목적이 재사용성이다. 코드의 중복성을 줄이고 유지 보수를 쉽게 해주는 장점을 가짐과 동시에 프로젝트의 일관성을 높여주기에 2개 이상의 컴포넌트에서 이용하는 재사용 가능한 컴포넌트를 만드는 것이 첫번째로 중요하다고 생각한다
  2. 적당한 선의 확장성
  앞에서도 말했지만, 공통 컴포넌트를 만드는 이유는 결국 개발을 편리하게 하기 위해서이다. 하지만 재사용 가능하다는 이유로 컴포넌트가 모든 경우에 대해서 대응해버린다면, 편리성보다는 그 경우에 대해서 모두 커버하는데에 오랜 시간이 들고 사용하는데에 있어서도 불편함이 생길 것이다. 그렇기에 공통 컴포넌트는 적당한 확장성을 가지는 것이 중요하다고 생각한다.
  