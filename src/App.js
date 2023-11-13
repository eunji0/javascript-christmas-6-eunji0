import InputView from './InputView.js';
import OutputView from './OutputView.js';
import DiscountCalculator from './DiscountCalculator.js';
import OrderProcessor from './OrderProcessor.js';

class App {
  constructor() {
    this.beforeDiscountTotalPrice = 0;
    this.totalBenefitPrice = 0;
    this.orderDetails = [];
    this.expectedPrice = 0;
  }

  async run() {
    try {
      OutputView.printGreeting();
      const visitDate = await InputView.visitDate();
      this.menuOrder = await InputView.orderMenuCount();
      OutputView.printVisitDate(visitDate);

      const orderProcessor = new OrderProcessor();
      const { orderDetails, beforeDiscountTotalPrice } = orderProcessor.processOrder(
        this.menuOrder,
      );

      this.orderDetails = orderDetails;
      this.beforeDiscountTotalPrice = beforeDiscountTotalPrice;
      // 주문 내역 출력
      OutputView.printOrderMenu(this.orderDetails);
      // 할인 전 총 주문 금액 출력
      OutputView.printBeforeDiscountTotalOrderAmount(this.beforeDiscountTotalPrice);
      // 증정 메뉴를 출력합니다.
      OutputView.printGiveawayMenu(this.beforeDiscountTotalPrice);

      // 혜택내역 출력
      this.printBenefitDetails(visitDate);

      const discountCalculator = new DiscountCalculator();
      discountCalculator.calculateDiscounts(visitDate, this.orderDetails);
      this.totalBenefitPrice = discountCalculator.getTotalBenefitPrice();

      // 총 혜택금액 출력
      OutputView.printTotalBenefitAmount(this.totalBenefitPrice);

      // 할인 후 예상 결제 금액
      this.printAfterDiscountExpectedAmount();
      // 이벤트 배지
      OutputView.printDecemberEventBadge(this.totalBenefitPrice);
    } catch (error) {
      OutputView.printError(error);
    }
  }

  // 혜택 내역 출력
  printBenefitDetails(visitDate) {
    const discountCalculator = new DiscountCalculator();
    OutputView.printBenefitDetails(visitDate);

    if (
      !discountCalculator.calculateChristmasDDayDiscount(visitDate) &&
      !discountCalculator.calculateWeekdayDiscount(visitDate, this.orderDetails) &&
      !discountCalculator.calculateWeekendDiscount(visitDate, this.orderDetails) &&
      !discountCalculator.calculateSpecialDiscount(visitDate)
    ) {
      OutputView.printNotExist();
    }

    OutputView.printChristmasDDayDiscount(
      discountCalculator.calculateChristmasDDayDiscount(visitDate),
    );

    OutputView.printWeekdayDiscount(
      discountCalculator.calculateWeekdayDiscount(visitDate, this.orderDetails),
    );

    OutputView.printWeekendDiscount(
      discountCalculator.calculateWeekendDiscount(visitDate, this.orderDetails),
    );

    OutputView.printSpecialDiscount(discountCalculator.calculateSpecialDiscount(visitDate));
  }

  printAfterDiscountExpectedAmount() {
    this.expectedPrice = this.beforeDiscountTotalPrice - this.totalBenefitPrice;
    OutputView.printAfterDiscountEstimatedPaymentAmount(this.expectedPrice);
  }
}

export default App;
