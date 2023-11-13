import OutputView from './OutputView.js';
import DiscountCalculator from './DiscountCalculator.js';
import { orderProcessorHandler, discountCalculatorHandler } from './handler.js';

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
      const discountCalculator = await discountCalculatorHandler();
      this.menuOrder = await orderProcessorHandler();
      OutputView.printVisitDate(discountCalculator.visitDate);

      const { orderDetails, beforeDiscountTotalPrice } = this.menuOrder.orderAndPrice;
      OutputView.printOrderMenu(orderDetails);
      OutputView.printBeforeDiscountTotalOrderAmount(beforeDiscountTotalPrice);
      OutputView.printGiveawayMenu(beforeDiscountTotalPrice);
      this.printBenefitDetails(discountCalculator.visitDate);
      this.totalBenefitPrice = discountCalculator.calculateDiscounts(
        discountCalculator.visitDate,
        orderDetails,
      );

      OutputView.printTotalBenefitAmount(discountCalculator.totalBenefitPrice);
      this.printAfterDiscountExpectedAmount();
      OutputView.printDecemberEventBadge(discountCalculator.totalBenefitPrice);
    } catch (error) {
      OutputView.printError(error);
    }
  }

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
