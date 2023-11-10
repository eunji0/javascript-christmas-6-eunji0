const ERROR_MESSAGE = Object.freeze({
  errorText: '[ERROR]',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const PRINT_MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  askVisitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
  askMenuCount: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
  previewEventBenefit: '에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  orderMenu: '<주문 메뉴>',
  beforeDiscountTotalOrderAmount: '<할인 전 총주문 금액>',
  giveawayMenu: '<증정 메뉴>',
  benefitDetails: '<혜택 내역>',
  totalBenefitAmount: '<총혜택 금액>',
  AfterDiscountEstimatedPaymentAmount: '<할인 후 예상 결제 금액>',
  decemberEventBadge: '<12월 이벤트 배지>',
});

const EVENT_BADGE = Object.freeze({
  star: '별',
  tree: '트리',
  santa: '산타',
});

const DOES_NOT_EXIST = Object.freeze('없음');

export { ERROR_MESSAGE, DOES_NOT_EXIST, PRINT_MESSAGE, EVENT_BADGE };
