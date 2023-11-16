import DiscountCalculator from '../src/Domain/DiscountCalculator';

describe('DiscountCalculator에 대한 Test', () => {
  const createDiscountCalculator = (visitDate, orderDetails) =>
    new DiscountCalculator(visitDate, orderDetails);

  describe('calculateChristmasDDayDiscount', () => {
    it('크리스마스 디데이 기간이 아닌 경우 할인이 적용되지 않아야 한다.', () => {
      const discountCalculator = createDiscountCalculator(26, ['티본스테이크 1개', '바비큐립 1개']);
      const discountPrice = discountCalculator.calculateDiscounts(26, [
        '티본스테이크 1개',
        '바비큐립 1개',
      ]);

      expect(discountPrice.christmasDDayDiscount).toEqual(0);
    });

    it('크리스마스 디데이 기간인 경우 할인이 정확히 계산되어야 한다.', () => {
      const discountCalculator = createDiscountCalculator(25, ['티본스테이크 1개', '바비큐립 1개']);
      const discountPrice = discountCalculator.calculateDiscounts(25, [
        '티본스테이크 1개',
        '바비큐립 1개',
      ]);

      expect(discountPrice.christmasDDayDiscount).toEqual(3400);
    });
  });

  describe('calculateWeekdayDiscount', () => {
    it('평일이고 디저트를 주문하지 않은 경우 할인이 적용되지 않아야 한다.', () => {
      const discountCalculator = createDiscountCalculator(3, ['티본스테이크 1개', '레드와인 2개']);
      const discountPrice = discountCalculator.calculateDiscounts(3, [
        '티본스테이크 1개',
        '레드와인 2개',
      ]);

      expect(discountPrice.weekdayDiscount).toEqual(0);
    });

    it('평일이고 디저트를 주문한 경우 디저트 메뉴를 1개당 할인이 적용된다.', () => {
      const discountCalculator = createDiscountCalculator(7, [
        '티본스테이크 1개',
        '초코케이크 2개',
      ]);
      const discountPrice = discountCalculator.calculateDiscounts(7, [
        '티본스테이크 1개',
        '초코케이크 2개',
      ]);

      expect(discountPrice.weekdayDiscount).toEqual(2023 * 2);
    });
  });

  describe('calculateWeekdendDiscount', () => {
    it('주말이고 메인메뉴를 주문하지 않은 경우 할인이 적용되지 않는다.', () => {
      const discountCalculator = createDiscountCalculator(1, ['시저샐러드 1개', '제로콜라 2개']);
      const discountPrice = discountCalculator.calculateDiscounts(1, [
        '시저샐러드 1개',
        '제로콜라 2개',
      ]);

      expect(discountPrice.weekendDiscount).toEqual(0);
    });

    it('주말이고 메인메뉴를 주문한 경우 개당 할인이 적용된다.', () => {
      const discountCalculator = createDiscountCalculator(9, ['시저샐러드 1개', '바비큐립 2개']);
      const discountPrice = discountCalculator.calculateDiscounts(9, [
        '시저샐러드 1개',
        '바비큐립 2개',
      ]);

      expect(discountPrice.weekendDiscount).toEqual(2023 * 2);
    });
  });

  describe('calculateSpecialDiscount', () => {
    it('이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인한다.', () => {
      const discountCalculator = createDiscountCalculator(3, ['시저샐러드 1개', '바비큐립 2개']);
      const discountPrice = discountCalculator.calculateDiscounts(3, [
        '시저샐러드 1개',
        '바비큐립 2개',
      ]);

      expect(discountPrice.specialDiscount).toEqual(1000);
    });

    it('이벤트 달력에 별이 없으면 총주문 금액에서 할인하지 않는다.', () => {
      const discountCalculator = createDiscountCalculator(4, ['시저샐러드 1개', '바비큐립 2개']);
      const discountPrice = discountCalculator.calculateDiscounts(4, [
        '시저샐러드 1개',
        '바비큐립 2개',
      ]);

      expect(discountPrice.weekendDiscount).toEqual(0);
    });
  });

  describe('calculateDiscounts', () => {
    it('각 할인이 정확히 계산되어 총 할인 금액이 올바르게 설정되어야 한다.', () => {
      const discountCalculator = createDiscountCalculator(25, [
        '티본스테이크 1개',
        '레드와인 2개',
        '초코케이크 3개',
      ]);
      const discountPrice = discountCalculator.calculateDiscounts(25, [
        '티본스테이크 1개',
        '레드와인 2개',
        '초코케이크 3개',
      ]);

      expect(discountPrice.christmasDDayDiscount).toEqual(3400);
      expect(discountPrice.weekdayDiscount).toEqual(2023 * 3);
      expect(discountPrice.weekendDiscount).toEqual(0);
      expect(discountPrice.specialDiscount).toEqual(1000);
      expect(discountPrice.totalBenefitPrice).toEqual(10469);
    });
  });
});
