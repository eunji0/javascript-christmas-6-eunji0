import OutputView from './View/OutputView.js';
import { EVENT_APPLICATION_PRICE, GIFT_EVENT_STANDARD, MENU_PRICES } from './Utils/constants.js';
import {
  discountCalculatorHandler,
  orderProcessorHandler,
  visitDateHandler,
} from './Utils/handler.js';

class App {
  #visitDate;

  #orderProcessor;

  #totalBenefitPrice = 0;

  async run() {
    try {
      OutputView.printGreeting();
      await this.initializeOrderDetails();
      const { orderDetails, beforeDiscountTotalPrice } = this.#orderProcessor;
      this.printOrderResults(orderDetails, beforeDiscountTotalPrice);
      await this.calculateAndPrintBenefits(orderDetails, beforeDiscountTotalPrice);
      this.printFinalResults(beforeDiscountTotalPrice);
    } catch (error) {
      OutputView.printError(error);
    }
  }

  async initializeOrderDetails() {
    this.#visitDate = await visitDateHandler();
    this.#orderProcessor = await orderProcessorHandler();
    OutputView.printVisitDate(this.#visitDate);
  }

  printOrderResults(orderDetails, beforeDiscountTotalPrice) {
    OutputView.printOrderMenu(orderDetails);
    OutputView.printBeforeDiscountTotalOrderAmount(beforeDiscountTotalPrice);
    OutputView.printGiveawayMenu(beforeDiscountTotalPrice);
  }

  async calculateAndPrintBenefits(orderDetails, beforeDiscountTotalPrice) {
    if (beforeDiscountTotalPrice < EVENT_APPLICATION_PRICE) {
      OutputView.printNotExist();
      return;
    }

    const discountCalculator = await discountCalculatorHandler(this.#visitDate, orderDetails);
    const { totalBenefitPrice, ...discountDetails } = discountCalculator;

    OutputView.printBenefitDetails(discountDetails, beforeDiscountTotalPrice);
    this.#totalBenefitPrice = totalBenefitPrice;
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
    return beforeDiscountTotalPrice >= GIFT_EVENT_STANDARD ? MENU_PRICES.샴페인 : 0;
  }
}

export default App;
