import { MENU_PRICES } from './constants.js';

class OrderProcessor {
  constructor() {
    this.orderDetails = [];
    this.beforeDiscountTotalPrice = 0;
  }

  processOrder(order) {
    // 각 메뉴의 주문 내역 및 금액 계산
    this.orderDetails = this.calculateOrderDetails(order);
    // 주문 내역에서 총 주문 금액 계산
    this.beforeDiscountTotalPrice = this.calculateTotalPrice(this.orderDetails);

    return {
      orderDetails: this.orderDetails,
      beforeDiscountTotalPrice: this.beforeDiscountTotalPrice,
    };
  }

  calculateOrderDetails(order) {
    // 각 주문 아이템의 내역 및 금액 계산
    return order.map((orderItem) => {
      const [menu, quantity] = orderItem.split('-').map((item) => item.trim());
      return `${menu} ${quantity}개`;
    });
  }

  calculateTotalPrice(orderDetails) {
    // 각 주문 내역의 금액을 합산하여 총 주문 금액 반환
    return orderDetails.reduce((total, item) => {
      const [menu, quantityString] = item.split(' ');
      const quantity = parseInt(quantityString, 10);
      return total + MENU_PRICES[menu] * quantity;
    }, 0);
  }

  getOrderDetails() {
    return this.orderDetails;
  }

  getBeforeDiscountTotalPrice() {
    return this.beforeDiscountTotalPrice;
  }
}

export default OrderProcessor;
