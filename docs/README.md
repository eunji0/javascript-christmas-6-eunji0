## 🚀크리스마스 프로모션

### 기능 구현 목록

1. 고객들이 방문할 날짜 물어보기(1 이상 31 이하의 숫자만 입력 가능)

- 고객들이 식당에 방문할 날짜 입력

- 1 이상 31 이하의 숫자가 아닐 경우
  - 에러메세지: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'

2. 고객들이 주문할 메뉴와 개수 물어보기(e.g. 해산물파스타-2,레드와인-1,초코케이크-1)

- 고객들이 주문할 메뉴와 개수 입력(메뉴판에 있는 메뉴만 입력 가능)

- 메뉴판에 없는 메뉴를 입력하는 경우

  - 에러메세지: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."

- 메뉴의 개수는 1 이상의 숫자만 입력되어야 한다.

  - 에러메세지: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."

- 메뉴 형식이 예시와 다른 경우
  - "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."

3. 해당 날짜에 우테코 식당에서 받을 이벤트 혜택 미리 보기 문구 출력

- 예시: '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!'

4. 주문메뉴 보여주기

- 출력 순서는 자유롭게.

5. 할인 전 총 주문 금액 보여주기

6. 증정 메뉴 보여주기

- 증정 이벤트에 해당하지 않는 경우, 증정 메뉴 "없음"으로 보여 준다.

7. 혜택 내역 보여주기

- 고객에게 적용된 이벤트 내역만 보여 준다.
- 적용된 이벤트가 하나도 없다면 혜택 내역 "없음"으로 보여 준다.
- 혜택 내역에 여러 개의 이벤트가 적용된 경우, 출력 순서는 자유롭게 출력한다.

8. 총혜택 금액 보여주기

- 총혜택 금액에 따라 이벤트 배지의 이름을 다르게 보여 준다.
- 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격

9. 할인 후 예상 결제 금액 보여주기

- 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액

10. 12월 이벤트 배지 보여주기

- 이벤트 배지가 부여되지 않는 경우, "없음"으로 보여

#### Error

- 모든 에러 메시지는 "[ERROR]"로 시작하도록 작성

#### 요구사항

- main브랜치에 커밋한다.
- indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 한다.
- Jest를 이용하여 본인이 정리한 기능 목록이 정상 동작함을 테스트 코드로 확인한다.
- 함수의 길이가 15라인을 넘지 않으며 한 가지 일만 하도록 한다.
- else를 지양한다.
- 도메인 로직에 단위 테스트를 구현해야 한다.
- 핵심 로직을 구현하는 코드와 UI(Console.readLineAsync, Console.print)를 담당하는 로직을 구분한다.
- 잘못된 값을 입력할 경우 throw문을 사용해 에러메세지를 남기고 해당부분부터 다시 입력받는다.
- 사용자의 값을 입력 받고 출력하기 위해서는 Console.readLineAsync, Console.print를 활용한다.

- InputView, OutputView 객체를 활용해 구현한다.
  - 입력과 출력을 담당하는 객체를 별도로 구현
  - InputView, OutputView의 파일 경로는 변경할 수 있다.
  - InputView, OutputView의 메서드의 이름과 인자는 필요에 따라 추가하거나 변경할 수 있다.
  - 값 출력을 위해 필요한 메서드를 추가할 수 있다.

#### 메뉴

<애피타이저>
양송이수프(6,000), 타파스(5,500), 시저샐러드(8,000)

<메인>
티본스테이크(55,000), 바비큐립(54,000), 해산물파스타(35,000), 크리스마스파스타(25,000)

<디저트>
초코케이크(15,000), 아이스크림(5,000)

<음료>
제로콜라(3,000), 레드와인(60,000), 샴페인(25,000)

#### 12월 이벤트 계획

- <strong>크리스마스 디데이 할인</strong>
  - 이벤트 기간: 2023.12.1 ~ 2023.12.25
  - 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
  - 총주문 금액에서 해당 금액만큼 할인  
    (e.g. 시작일인 12월 1일에 1,000원, 2일에 1,100원, ..., 25일엔 3,400원 할인)
- <strong>평일 할인(일요일~목요일)</strong>: 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
- <strong>주말 할인(금요일, 토요일)</strong>: 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
- <strong>특별 할인</strong>: 이벤트 달력에 별(12월 3일, 10일, 17일, 24일, 25일 31일)이 있으면 총주문 금액에서 1,000원 할인
- <strong>증정 이벤트</strong>: 할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
- <strong>이벤트 기간</strong>: '크리스마스 디데이 할인'을 제외한 다른 이벤트는 2023.12.1 ~ 2023.12.31 동안 적용

#### 혜택 금액에 따른 12월 이벤트 배지 부여

- 총혜택 금액에 따라 다른 이벤트 배지를 부여합니다.

  - 5천 원 이상: 별
  - 1만 원 이상: 트리
  - 2만 원 이상: 산타

#### 고객에게 안내할 이벤트 주의 사항

- 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
- 음료만 주문 시, 주문할 수 없습니다.
- 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.  
  (e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)