import OrderProcessor from '../src/Domain/OrderProcessor.js';
import { MENU_PRICES } from '../src/utils/constants.js';

describe('OrderProcessor에 대한 Test', () => {
  const createOrderProcessor = (order) => new OrderProcessor(order);

  it('주문이 주어진 경우, 주문 내역과 할인 전 총 주문 금액이 계산되어야 한다.', () => {
    const order = ['티본스테이크-1', '바비큐립-2', '초코케이크-3'];
    const expectedOrderDetails = ['티본스테이크 1개', '바비큐립 2개', '초코케이크 3개'];
    const expectedBeforeDiscountTotalPrice =
      MENU_PRICES['티본스테이크'] * 1 + MENU_PRICES['바비큐립'] * 2 + MENU_PRICES['초코케이크'] * 3;

    const orderProcessor = createOrderProcessor(order);

    expect(orderProcessor.orderAndPrice.orderDetails).toEqual(expectedOrderDetails);
    expect(orderProcessor.orderAndPrice.beforeDiscountTotalPrice).toEqual(
      expectedBeforeDiscountTotalPrice,
    );
  });

  it('주문이 없는 경우, 주문 내역과 할인 전 총 주문 금액이 빈 값으로 초기화되어야 한다.', () => {
    const order = [];
    const expectedOrderDetails = [];
    const expectedBeforeDiscountTotalPrice = 0;

    const orderProcessor = createOrderProcessor(order);

    expect(orderProcessor.orderAndPrice.orderDetails).toEqual(expectedOrderDetails);
    expect(orderProcessor.orderAndPrice.beforeDiscountTotalPrice).toEqual(
      expectedBeforeDiscountTotalPrice,
    );
  });
});
