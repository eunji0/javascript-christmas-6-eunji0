import OutputView from './OutputView.js';
import { MENU_PRICES } from './constants.js';
import { discountCalculatorHandler, orderProcessorHandler, visitDateHandler } from './handler.js';

class App {
  #menuOrder;

  constructor() {
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

      const { discountCalculator } = await discountCalculatorHandler(visitDate, orderDetails);
      OutputView.printBenefitDetails(discountCalculator, beforeDiscountTotalPrice);
      this.totalBenefitPrice = discountCalculator.totalBenefitPrice;

      OutputView.printTotalBenefitAmount(
        this.totalBenefitPrice + this.addGiftEvent(beforeDiscountTotalPrice),
      );
      OutputView.printAfterDiscountEstimatedPaymentAmount(
        beforeDiscountTotalPrice - this.totalBenefitPrice,
      );
      OutputView.printDecemberEventBadge(
        this.totalBenefitPrice + this.addGiftEvent(beforeDiscountTotalPrice),
      );
    } catch (error) {
      OutputView.printError(error);
    }
  }

  addGiftEvent(beforeDiscountTotalPrice) {
    if (beforeDiscountTotalPrice >= 120_000) {
      return MENU_PRICES.샴페인;
    }
    return 0;
  }
}

export default App;
