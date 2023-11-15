import { MENU_PRICES } from '../Utils/constants.js';

class OrderProcessor {
  #orderAndPrice = {};

  constructor(order) {
    this.processOrder(order);
  }

  processOrder(order) {
    this.#orderAndPrice = {};
    const orderDetails = this.#calculateOrderDetails(order);
    const beforeDiscountTotalPrice = this.#calculateTotalPrice(orderDetails);

    this.#orderAndPrice = {
      orderDetails,
      beforeDiscountTotalPrice,
    };

    return this.#orderAndPrice;
  }

  #calculateOrderDetails(order) {
    return order.map((orderItem) => {
      const [menu, quantity] = orderItem.split('-').map((item) => item.trim());
      return `${menu} ${parseInt(quantity, 10)}개`;
    });
  }

  #calculateTotalPrice(orderDetails) {
    return orderDetails.reduce((total, item) => {
      const [menu, quantityString] = item.split(' ');
      const quantity = parseInt(quantityString, 10);
      return total + MENU_PRICES[menu] * quantity;
    }, 0);
  }
}

export default OrderProcessor;
