import { NUMBER, MENU_LIST, SPECIAL_DAY } from '../Utils/constants.js';
import { calculateIndex, isIndexInRange, isValidDay, isWeekdayOrWeekend } from '../Utils/utils.js';

class DiscountCalculator {
  #christmasDDayDiscount = 0;

  #weekdayDiscount = 0;

  #weekendDiscount = 0;

  #specialDiscount = 0;

  #totalBenefitPrice = 0;

  constructor(visitDate, orderDetails) {
    this.calculateDiscounts(visitDate, orderDetails);
  }

  calculateDiscounts(visitDate, orderDetails) {
    this.#christmasDDayDiscount = this.#calculateChristmasDDayDiscount(visitDate);
    this.#weekdayDiscount = this.#calculateWeekdayDiscount(visitDate, orderDetails);
    this.#weekendDiscount = this.#calculateWeekendDiscount(visitDate, orderDetails);
    this.#specialDiscount = this.#calculateSpecialDiscount(visitDate);

    this.#calculateTotalBenefitPrice();

    return this.getDiscountDetails();
  }

  #calculateTotalBenefitPrice() {
    this.#totalBenefitPrice =
      this.#christmasDDayDiscount +
      this.#weekdayDiscount +
      this.#weekendDiscount +
      this.#specialDiscount;
  }

  getDiscountDetails() {
    return {
      totalBenefitPrice: this.#totalBenefitPrice,
      christmasDDayDiscount: this.#christmasDDayDiscount,
      weekdayDiscount: this.#weekdayDiscount,
      weekendDiscount: this.#weekendDiscount,
      specialDiscount: this.#specialDiscount,
    };
  }

  #calculateChristmasDDayDiscount(visitDate) {
    if (isValidDay(visitDate, NUMBER.firstDay, NUMBER.christmasDay)) {
      return this.#calculateDiscountChristmas(visitDate);
    }
    return 0;
  }

  #calculateDiscountChristmas(visitDate) {
    const discountSchedule = this.#generateDiscountChristmas();
    const index = calculateIndex(visitDate, 0);

    return isIndexInRange(index, discountSchedule.length) ? discountSchedule[index] : 0;
  }

  #generateDiscountChristmas() {
    const numberOfDays = NUMBER.christmasDay;

    return Array.from(
      { length: numberOfDays },
      (_, index) => NUMBER.initialDiscount + NUMBER.discountedPriceAmount * index,
    );
  }

  #calculateWeekdayDiscount(visitDate, orderDetails) {
    if (!isWeekdayOrWeekend(visitDate) && this.#isMenuOrdered(orderDetails, MENU_LIST.디저트)) {
      return this.#calculateMenuDiscount(orderDetails, MENU_LIST.디저트, NUMBER.menuDiscount);
    }
    return 0;
  }

  #calculateWeekendDiscount(visitDate, orderDetails) {
    if (isWeekdayOrWeekend(visitDate) && this.#isMenuOrdered(orderDetails, MENU_LIST.메인)) {
      return this.#calculateMenuDiscount(orderDetails, MENU_LIST.메인, NUMBER.menuDiscount);
    }
    return 0;
  }

  #calculateSpecialDiscount(visitDate) {
    return SPECIAL_DAY.includes(visitDate) ? NUMBER.initialDiscount : 0;
  }

  #calculateMenuDiscount(orderDetails, menuList, discountRate) {
    return orderDetails.reduce((discount, orderDetail) => {
      const [menu, quantityString] = orderDetail.split(' ').map((item) => item.trim());
      const quantity = parseInt(quantityString, 10);

      return menuList.includes(menu) ? discount + discountRate * quantity : discount;
    }, 0);
  }

  #isMenuOrdered(orderDetails, menuList) {
    return orderDetails.some((item) => menuList.includes(item.split(' ')[0]));
  }
}

export default DiscountCalculator;
