import { NUMBER, MENU_LIST, SPECIAL_DAY } from './constants.js';
import { calculateIndex, isInRange, isIndexInRange, isValidDay, parseDay } from './utils.js';

class DiscountCalculator {
  constructor(visitDate, orderDetails) {
    this.christmasDDayDiscount = 0;
    this.weekdayDiscount = 0;
    this.weekendDiscount = 0;
    this.specialDiscount = 0;
    this.totalBenefitPrice = 0;
    this.calculateDiscounts(visitDate, orderDetails);
  }

  calculateDiscounts(visitDate, orderDetails) {
    this.christmasDDayDiscount = this.calculateChristmasDDayDiscount(visitDate);
    this.weekdayDiscount = this.calculateWeekdayDiscount(visitDate, orderDetails);
    this.weekendDiscount = this.calculateWeekendDiscount(visitDate, orderDetails);
    this.specialDiscount = this.calculateSpecialDiscount(visitDate);

    this.totalBenefitPrice =
      this.christmasDDayDiscount +
      this.weekdayDiscount +
      this.weekendDiscount +
      this.specialDiscount;
  }

  calculateChristmasDDayDiscount(visitDate) {
    if (isValidDay(visitDate, NUMBER.firstDay, NUMBER.christmasDay)) {
      return this.calculateDiscountChristmas(visitDate);
    }
    return 0;
  }

  calculateDiscountChristmas(visitDate) {
    const discountSchedule = this.generateDiscountChristmas();
    const index = calculateIndex(visitDate, 1);

    return isIndexInRange(index, discountSchedule.length) ? discountSchedule[index - 1] : 0;
  }

  generateDiscountChristmas() {
    const numberOfDays = NUMBER.christmasDay;

    return Array.from(
      { length: numberOfDays },
      (_, index) => NUMBER.initialDiscount + NUMBER.discountedPriceAmount * index,
    );
  }

  calculateWeekdayDiscount(visitDate, orderDetails) {
    if (
      this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
      this.isMenuOrdered(orderDetails, MENU_LIST.디저트)
    ) {
      return this.calculateMenuDiscount(orderDetails, MENU_LIST.디저트, NUMBER.menuDiscount);
    }
    return 0;
  }

  calculateWeekendDiscount(visitDate, orderDetails) {
    if (
      !this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
      this.isMenuOrdered(orderDetails, MENU_LIST.메인)
    ) {
      return this.calculateMenuDiscount(orderDetails, MENU_LIST.메인, NUMBER.menuDiscount);
    }
    return 0;
  }

  calculateSpecialDiscount(visitDate) {
    return SPECIAL_DAY.includes(visitDate) ? NUMBER.initialDiscount : 0;
  }

  calculateMenuDiscount(orderDetails, menuList, discountRate) {
    return orderDetails.reduce((discount, orderDetail) => {
      const [menu, quantityString] = orderDetail.split(' ').map((item) => item.trim());
      const quantity = parseInt(quantityString, 10);

      return menuList.includes(menu) ? discount + discountRate * quantity : discount;
    }, 0);
  }

  isWeekdayOrWeekend(visitDate, startDay, endDay) {
    const dayNumber = parseDay(visitDate);
    return (
      isValidDay(visitDate, NUMBER.firstDay, NUMBER.endDay) &&
      isInRange(dayNumber, startDay, endDay)
    );
  }

  isMenuOrdered(orderDetails, menuList) {
    return orderDetails.some((item) => menuList.includes(item.split(' ')[0]));
  }
}

export default DiscountCalculator;
