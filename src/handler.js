import DiscountCalculator from './DiscountCalculator.js';
import InputView from './View/InputView.js';
import OrderProcessor from './OrderProcessor.js';
import OutputView from './View/OutputView.js';

const ErrorHandlerAndRetry = async (handler, retry) => {
  try {
    return await handler();
  } catch (err) {
    OutputView.printError(err);
    if (err) return retry();
    throw err;
  }
};

const orderProcessorHandler = async () =>
  ErrorHandlerAndRetry(async () => {
    const response = await InputView.orderMenuCount();
    return new OrderProcessor(response);
  }, orderProcessorHandler);

const visitDateHandler = async () =>
  ErrorHandlerAndRetry(async () => {
    const response = await InputView.visitDate();
    return response;
  }, visitDateHandler);

const discountCalculatorHandler = async (visitDate, orderDetails) =>
  ErrorHandlerAndRetry(
    async () => {
      const discountCalculator = new DiscountCalculator(visitDate, orderDetails);
      return { discountCalculator };
    },
    async () => discountCalculatorHandler(visitDate, orderDetails),
  );

export { orderProcessorHandler, visitDateHandler, discountCalculatorHandler };
