import OutputView from './View/OutputView.js';
import { EVENT_APPLICATION_PRICE, MENU_PRICES } from './utils/constants.js';
import {
  discountCalculatorHandler,
  orderProcessorHandler,
  visitDateHandler,
} from './utils/handler.js';

class App {
  #visitDate;

  #menuOrder;

  #totalBenefitPrice = 0;

  async run() {
    try {
      OutputView.printGreeting();
      await this.initializeOrderDetails();
      const { orderDetails, beforeDiscountTotalPrice } = this.#menuOrder.orderAndPrice;
      this.printOrderResults(orderDetails, beforeDiscountTotalPrice);
      await this.calculateAndPrintBenefits(orderDetails, beforeDiscountTotalPrice);
      this.printFinalResults(beforeDiscountTotalPrice);
    } catch (error) {
      OutputView.printError(error);
    }
  }

  async initializeOrderDetails() {
    this.#visitDate = await visitDateHandler();
    this.#menuOrder = await orderProcessorHandler();
    OutputView.printVisitDate(this.#visitDate);
  }

  printOrderResults(orderDetails, beforeDiscountTotalPrice) {
    OutputView.printOrderMenu(orderDetails);
    OutputView.printBeforeDiscountTotalOrderAmount(beforeDiscountTotalPrice);
    OutputView.printGiveawayMenu(beforeDiscountTotalPrice);
  }

  async calculateAndPrintBenefits(orderDetails, beforeDiscountTotalPrice) {
    if (beforeDiscountTotalPrice >= EVENT_APPLICATION_PRICE) {
      const { discountCalculator } = await discountCalculatorHandler(this.#visitDate, orderDetails);
      OutputView.printBenefitDetails(discountCalculator, beforeDiscountTotalPrice);
      this.#totalBenefitPrice = discountCalculator.totalBenefitPrice;
      return;
    }
    OutputView.printNotExist();
  }

  printFinalResults(beforeDiscountTotalPrice) {
    const totalWithGiftEvent =
      this.#totalBenefitPrice + this.addGiftEvent(beforeDiscountTotalPrice);

    OutputView.printTotalBenefitAmount(totalWithGiftEvent);
    OutputView.printAfterDiscountEstimatedPaymentAmount(
      beforeDiscountTotalPrice - this.#totalBenefitPrice,
    );
    OutputView.printDecemberEventBadge(totalWithGiftEvent);
  }

  addGiftEvent(beforeDiscountTotalPrice) {
    return beforeDiscountTotalPrice >= 120_000 ? MENU_PRICES.샴페인 : 0;
  }
}

export default App;
