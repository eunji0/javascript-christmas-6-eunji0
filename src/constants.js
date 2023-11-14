const ERROR_MESSAGE = Object.freeze({
  errorText: '[ERROR] ',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.\n',
  invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.\n',
});

const PRINT_MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  askVisitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  askMenuCount:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  previewEventBenefit: '일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',
  orderMenu: '<주문 메뉴>',
  beforeDiscountTotalOrderAmount: '\n<할인 전 총주문 금액>',
  giveawayMenu: '\n<증정 메뉴>',
  benefitDetails: '<혜택 내역>',
  totalBenefitAmount: '\n<총혜택 금액>',
  giveChampagne: '샴페인 1개\n',
  doesNotExist: '없음\n',
  AfterDiscountEstimatedPaymentAmount: '\n<할인 후 예상 결제 금액>',
  decemberEventBadge: '\n<12월 이벤트 배지>',
});

const BENEFIT_MESSAGE = Object.freeze({
  christmasDDay: '크리스마스 디데이 할인:',
  weekday: '평일 할인:',
  weekend: '주말 할인:',
  special: '특별 할인:',
  giveEvent: '증정 이벤트:',
});

const MENU_LIST = {
  애피타이저: ['양송이수프', '타파스', '시저샐러드'],
  메인: ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'],
  디저트: ['초코케이크', '아이스크림'],
  음료: ['제로콜라', '레드와인', '샴페인'],
};

const MENU_PRICES = {
  양송이수프: 6000,
  타파스: 5500,
  시저샐러드: 8000,
  티본스테이크: 55000,
  바비큐립: 54000,
  해산물파스타: 35000,
  크리스마스파스타: 25000,
  초코케이크: 15000,
  아이스크림: 5000,
  제로콜라: 3000,
  레드와인: 60000,
  샴페인: 25000,
};

const EVENT_BADGE = Object.freeze({
  star: '별\n',
  tree: '트리\n',
  santa: '산타\n',
});

const SPECIAL_DAY = Object.freeze([3, 10, 17, 24, 25, 31]);

const NUMBER = Object.freeze({
  firstDay: 1,
  christmasDay: 25,
  endDay: 31,
  maxTotalMenuCount: 20,
  orderQuantity: 1,
  weekdayDivisionFrom: 0,
  weekdayDivisionTo: 4,
  initialDiscount: 1000,
  menuDiscount: 2023,
  discountedPriceAmount: 100,
});

export {
  ERROR_MESSAGE,
  PRINT_MESSAGE,
  EVENT_BADGE,
  MENU_LIST,
  MENU_PRICES,
  BENEFIT_MESSAGE,
  SPECIAL_DAY,
  NUMBER,
};
