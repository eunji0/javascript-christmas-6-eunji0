import OutputView from './OutputView.js';
import DiscountCalculator from './DiscountCalculator.js';
import { orderProcessorHandler, visitDateHandler } from './handler.js';

class App {
  #menuOrder;

  constructor() {
    this.totalBenefitPrice = 0;
    this.expectedPrice = 0;
  }

  async run() {
    try {
      OutputView.printGreeting();

      const visitDate = await visitDateHandler();
      this.#menuOrder = await orderProcessorHandler();
      OutputView.printVisitDate(visitDate);

      const { orderDetails, beforeDiscountTotalPrice } = this.#menuOrder.orderAndPrice;

      OutputView.printOrderMenu(orderDetails);
      OutputView.printBeforeDiscountTotalOrderAmount(beforeDiscountTotalPrice);
      OutputView.printGiveawayMenu(beforeDiscountTotalPrice);

      this.printBenefitDetails(visitDate, orderDetails);

      const discountCalculator = new DiscountCalculator();
      this.totalBenefitPrice = discountCalculator.calculateDiscounts(visitDate, orderDetails);

      OutputView.printTotalBenefitAmount(this.totalBenefitPrice);
      OutputView.printAfterDiscountEstimatedPaymentAmount(
        beforeDiscountTotalPrice - this.totalBenefitPrice,
      );
      OutputView.printDecemberEventBadge(this.totalBenefitPrice);
    } catch (error) {
      OutputView.printError(error);
    }
  }

  printBenefitDetails(visitDate, orderDetails) {
    const discountCalculator = new DiscountCalculator();
    OutputView.printBenefitDetails(visitDate);

    if (
      !discountCalculator.calculateChristmasDDayDiscount(visitDate) &&
      !discountCalculator.calculateWeekdayDiscount(visitDate, orderDetails) &&
      !discountCalculator.calculateWeekendDiscount(visitDate, orderDetails) &&
      !discountCalculator.calculateSpecialDiscount(visitDate)
    ) {
      OutputView.printNotExist();
    }

    OutputView.printChristmasDDayDiscount(
      discountCalculator.calculateChristmasDDayDiscount(visitDate),
    );

    OutputView.printWeekdayDiscount(
      discountCalculator.calculateWeekdayDiscount(visitDate, orderDetails),
    );

    OutputView.printWeekendDiscount(
      discountCalculator.calculateWeekendDiscount(visitDate, orderDetails),
    );

    OutputView.printSpecialDiscount(discountCalculator.calculateSpecialDiscount(visitDate));
  }
}

export default App;
