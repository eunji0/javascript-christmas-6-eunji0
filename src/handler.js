import InputView from './InputView.js';
import OrderProcessor from './OrderProcessor.js';
import OutputView from './OutputView.js';

const ErrorHandlerAndRetry = async (handler, retry) => {
  try {
    return await handler();
  } catch (err) {
    OutputView.printError(err);
    if (err) {
      return await retry();
    }
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

export { orderProcessorHandler, visitDateHandler };

// const discountCalculatorHandler = async () =>
//   ErrorHandlerAndRetry(async () => {
//     const response = await InputView.visitDate();
//     return new DiscountCalculator(response);
//   }, discountCalculatorHandler);
