import InputCheck from './InputCheck.js';

const InputValidator = {
  visitDateInput: (date) => {
    InputCheck.checkValidDate(date);
  },

  menuCountInput: (order) => {
    const orderResult = InputCheck.checkValidOrder(order);
    InputCheck.validateTotalItems(orderResult.map((item) => item.quantity));
    return orderResult;
  },
};

export default InputValidator;
