import InputCheck from './InputCheck.js';

const InputValidator = {
  visitDateInput: (date) => {
    InputCheck.checkValidDate(date.trim());
  },

  menuCountInput: (order) => {
    const orderResult = InputCheck.checkValidOrder(order.trim());
    InputCheck.validateTotalItems(orderResult.map((item) => item.quantity));
    return orderResult;
  },
};

export default InputValidator;
