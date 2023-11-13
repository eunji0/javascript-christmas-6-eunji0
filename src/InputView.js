import { Console } from '@woowacourse/mission-utils';
import { PRINT_MESSAGE } from './constants.js';
import InputValidator from './InputValidator.js';

const InputView = {
  async getInputValidate(userInput, validate) {
    let input;
    let isValidInput = false;

    while (!isValidInput) {
      try {
        input = await userInput();
        validate(input);
        isValidInput = true;
      } catch (error) {
        Console.print(error.message);
      }
    }

    return input;
  },

  async visitDate() {
    const dateInput = await InputView.getInputValidate(
      async () => Console.readLineAsync(PRINT_MESSAGE.askVisitDate),
      InputValidator.visitDateInput,
    );
    return Number(dateInput);
  },

  async orderMenuCount() {
    const orderInput = await InputView.getInputValidate(
      async () => Console.readLineAsync(PRINT_MESSAGE.askMenuCount),
      InputValidator.menuCountInput,
    );
    return orderInput.split(',').map((item) => item.trim());
  },
};

export default InputView;
