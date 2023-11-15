import { Console } from '@woowacourse/mission-utils';
import { PRINT_MESSAGE } from '../utils/constants.js';
import InputValidator from '../validator/InputValidator.js';

const InputView = {
  async getInputValidate(userInput, validate) {
    const input = await userInput();
    validate(input);
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
