import { ERROR_MESSAGE } from './constants.js';
import InputCheck from './InputCheck.js';

const InputValidator = {
  visitDateInput: (date) => {
    InputCheck.checkValidDate(date);
  },

  menuCountInput: (order) => {
    const orderResult = InputCheck.checkValidOrder(order);
    InputValidator.validateTotalItems(orderResult.map((item) => item.quantity));
    return orderResult;
  },

  validateTotalItems: (quantity) => {
    const totalItems = quantity.reduce((total, item) => total + Number(item), 0);
    if (totalItems > 20) {
      throw new Error(
        `${ERROR_MESSAGE.errorText}${ERROR_MESSAGE.invalidOrder}주문할 수 있는 최대 개수는 20개입니다.`,
      );
    }
  },
};

export default InputValidator;
