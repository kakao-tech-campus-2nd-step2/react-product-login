### 선물 랭킹

#### GET /api/v1/ranking/products

##### Description:

선물 랭킹 목록을 가져와요.

##### Parameters:

| Name       | In    | Type   | Required | Description                                                                                                                                  |
|------------|-------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| targetType | query | string | false    | 선물 랭킹 대상자 filter에요. 순서대로 "모두가", "여성이", "남성이", "청소년이"를 의미해요. (enum: [ALL, FEMALE, MALE, TEEN], default: ALL)                                  |
| rankType   | query | string | false    | 선물 랭킹 정렬 filter에요. 순서대로 "받고 싶어한", "많이 선물한", "위시로 받은"을 의미해요. (enum: [MANY_WISH, MANY_RECEIVE, MANY_WISH_RECEIVE], default: MANY_WISH_RECEIVE) |

##### Responses:

| Code | Description      |
|------|------------------|
| 200  | 선물 랭킹 목록을 가져왔어요. |

##### Response Example (200):

```json
{
  "products": [
    {
      "id": 123,
      "name": "BBQ 양념치킨+크림치즈볼+콜라1.25L",
      "imageURL": "https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg",
      "wish": {
        "wishCount": 201,
        "isWished": false
      },
      "price": {
        "basicPrice": 29000,
        "discountRate": 0,
        "sellingPrice": 29000
      },
      "brandInfo": {
        "id": 2088,
        "name": "BBQ",
        "imageURL": "https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png"
      }
    }
  ]
}
```

##### cURL Example

```shell
curl -X GET "/api/v1/ranking/products?targetType=ALL&rankType=MANY_WISH_RECEIVE" -H "Content-Type: application/json"
```

---

### 선물 카테고리 목록

#### GET /api/v1/themes

##### Description:

모임 홈의 선물 테마 카테고리 목록을 불러와요.

##### Parameters:

없음

##### Responses:

| Code | Description   |
|------|---------------|
| 200  | 선물 테마 카테고리 목록 |

##### Response Example (200):

```json
{
  "themes": [
    {
      "id": 1,
      "key": "life_small_gift",
      "label": "가벼운 선물",
      "title": "예산은 가볍게, 감동은 무겁게❤️",
      "description": "당신의 센스를 뽐내줄 부담 없는 선물",
      "backgroundColor": "#F5F5F5"
    }
  ]
}
```

##### cURL Example

```shell
curl -X GET "/api/v1/themes" -H "Content-Type: application/json"
```

---

### 선물 테마별 제품

#### GET /api/v1/themes/{themeKey}/products

##### Description:

선물 테마 Key에 해당하는 선물 목록을 불러와요.

##### Parameters:

| Name       | In    | Type    | Required | Description                          |
|------------|-------|---------|----------|--------------------------------------|
| themeKey   | path  | string  | true     | 선물 테마 Key                            |
| pageToken  | query | string  | false    | 목록 불러오기에 사용할 페이지 토큰                  |
| maxResults | query | integer | false    | API 호출 시 최대로 가져올 선물 개수 (default: 10) |

##### Responses:

| Code | Description                 |
|------|-----------------------------|
| 200  | 선물 목록                       |
| 404  | 선물 테마 Key에 해당하는 선물 테마가 없어요. |

##### Response Example (200):

```json
{
  "products": [
    {
      "id": 123,
      "name": "BBQ 양념치킨+크림치즈볼+콜라1.25L",
      "imageURL": "https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg",
      "wish": {
        "wishCount": 201,
        "isWished": false
      },
      "price": {
        "basicPrice": 29000,
        "discountRate": 0,
        "sellingPrice": 29000
      },
      "brandInfo": {
        "id": 2088,
        "name": "BBQ",
        "imageURL": "https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png"
      }
    }
  ],
  "nextPageToken": "CAUQAA",
  "pageInfo": {
    "totalResults": 100,
    "resultsPerPage": 10
  }
}
```

##### cURL Example

```shell
curl -X GET "/api/v1/themes/life_small_gift/products?pageToken=CAUQAA&maxResults=10" -H "Content-Type: application/json"
```
### 선물 옵션 API 문서

#### GET /api/v1/products/{productId}/options

##### Description:
선물 id에 해당하는 선물 상세 옵션을 불러와요.

##### Parameters:

| Name      | In   | Type   | Required | Description |
|-----------|------|--------|----------|-------------|
| productId | path | string | true     | 선물 id      |

##### Responses:

| Code | Description                                                                                      |
|------|--------------------------------------------------------------------------------------------------|
| 200  | (WIP)재귀적으로 option object를 가지고 있을 때엔 어떻게 해야하지? https://gift.kakao.com/product/6126227 (deps 2개) https://gift.kakao.com/product/6875548 (deps 1개) https://gift.kakao.com/product/5022423 (deps 0개) (0개여도 1개를 내려주면 좋을 듯) |

##### cURL Example
```shell
curl -X GET "/api/v1/products/123/options" -H "Content-Type: application/json"
```

---

### 메시지 카드 템플릿 API 문서

#### GET /api/v1/message-card/templates

##### Description:
메시지 카드 템플릿 목록을 불러와요. (별도의 카테고리는 없어요.)

##### Parameters:
없음

##### Responses:

| Code | Description           |
|------|-----------------------|
| 200  | 메시지 카드 템플릿 목록 |

##### Response Example (200):

```json
{
  "templates": [
    {
      "id": 1,
      "defaultTextMessage": "새해 복 많이 받으세요~",
      "thumbURL": "https://t1.daumcdn.net/gift/message-card/template/image/20231228_HKPYY.png",
      "imageURL": "https://t1.daumcdn.net/gift/message-card/template/image/20231228_FJQKU.gif"
    }
  ]
}
```

##### cURL Example

```shell
curl -X GET "/api/v1/message-card/templates" -H "Content-Type: application/json"
```

---

### 내 정보 API 문서

#### GET /api/v1/my-account/info

##### Description:
내 정보를 불러와요.

##### Parameters:
없음

##### Responses:

| Code | Description |
|------|-------------|
| 200  | 내 정보       |

##### Response Example (200):

```json
{
  "id": 123,
  "name": "김카카오",
  "birthday": "1990-01-01",
  "profileImageURL": "https://p.kakaocdn.net/th/talkp/wnkiL6MwHV/iteScBgZ8Yb76BqdI9a9K/7isevt_110x110_c.jpg",
  "point": 1000
}
```

##### cURL Example
```shell
curl -X GET "/api/v1/my-account/info" -H "Content-Type: application/json"
```

---

### 받고 싶은 선물 목록 API 문서

#### GET /api/v1/my-account/wish/products

##### Description:
내가 받고 싶어하는 선물 목록을 불러와요.

##### Parameters:

| Name       | In    | Type    | Required | Description                         |
|------------|-------|---------|----------|-------------------------------------|
| pageToken  | query | string  | false    | 목록 불러오기에 사용할 페이지 토큰 |
| maxResults | query | integer | false    | API 호출 시 최대로 가져올 선물 개수 (default: 10) |

##### Responses:

| Code | Description           |
|------|-----------------------|
| 200  | 선물 목록               |

##### Response Example (200):

```json
{
  "products": [
    {
      "id": 123,
      "name": "BBQ 양념치킨+크림치즈볼+콜라1.25L",
      "imageURL": "https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg",
      "wish": {
        "wishCount": 201,
        "isWished": false
      },
      "price": {
        "basicPrice": 29000,
        "discountRate": 0,
        "sellingPrice": 29000
      },
      "brandInfo": {
        "id": 2088,
        "name": "BBQ",
        "imageURL": "https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png"
      }
    }
  ],
  "nextPageToken": "CAUQAA",
  "pageInfo": {
    "totalResults": 100,
    "resultsPerPage": 10
  }
}
```

##### cURL Example
```shell
curl -X GET "/api/v1/my-account/wish/products?pageToken=CAUQAA&maxResults=10" -H "Content-Type: application/json"
```
---

### 내 포인트 충전 API 문서

#### PUT /api/v1/my-account/point

##### Description:
내 포인트를 충전해요.

##### Parameters:
없음

##### Request Body:

| Name  | Type    | Required | Description |
|-------|---------|----------|-------------|
| point | integer | true     | 내 포인트      |

##### Request Example:

{
"point": 1000
}

##### Responses:

| Code | Description       |
|------|-------------------|
| 204  | 내 포인트를 수정했어요. |

##### cURL Example
```shell
curl -X PUT "/api/v1/my-account/point" -H "Content-Type: application/json" -d '{"point": 1000}'
```
---

### 상품 주문 API 문서

#### POST /api/v1/order

##### Description:
상품 주문 요청을 보내요.

##### Parameters:
없음

##### Request Body:

| Name                      | Type    | Required | Description             |
|---------------------------|---------|----------|-------------------------|
| productId                 | integer | true     | 선물 id                  |
| productOptionId           | integer | true     | 선물 옵션 id              |
| productQuantity           | integer | true     | 주문 수량                  |
| messageCardTemplateId     | integer | true     | 메시지 카드 템플릿 id       |
| messageCardTextMessage    | string  | true     | 메시지 카드 문구            |
| senderId                  | integer | true     | 선물 보내는 사람 id         |
| receiverId                | integer | true     | 선물 받는 사람 id          |
| hasCashReceipt            | boolean | true     | 현금영수증 발행 여부        |
| cashReceiptType           | string  | false    | 현금영수증 발행 타입         |
| cashReceiptNumber         | string  | false    | 현금영수증 번호            |

##### Request Example:

```json

{
  "productId": 123,
  "productOptionId": 123,
  "productQuantity": 1,
  "messageCardTemplateId": 1,
  "messageCardTextMessage": "새해 복 많이 받으세요~",
  "senderId": 123,
  "receiverId": 123,
  "hasCashReceipt": true,
  "cashReceiptType": "PERSONAL",
  "cashReceiptNumber": "1234567890"
}
```

##### Responses:

| Code | Description               |
|------|---------------------------|
| 204  | 상품 주문 요청을 보냈어요.  |
| 400  | 상품 주문 요청을 보내는데 실패했어요. |

##### cURL Example

```shell
curl -X POST "/api/v1/order" -H "Content-Type: application/json" -d '{
"productId": 123,
"productOptionId": 123,
"productQuantity": 1,
"messageCardTemplateId": 1,
"messageCardTextMessage": "새해 복 많이 받으세요~",
"senderId": 123,
"receiverId": 123,
"hasCashReceipt": true,
"cashReceiptType": "PERSONAL",
"cashReceiptNumber": "1234567890"
}'
```

