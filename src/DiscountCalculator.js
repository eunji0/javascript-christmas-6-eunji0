import { NUMBER, MENU_LIST, SPECIAL_DAY } from './constants.js';

// class DiscountCalculator {
//   constructor(visitDate, orderDetails) {
//     this.calculateDiscounts(visitDate, orderDetails);
//   }

//   calculateDiscounts(visitDate, orderDetails) {
//     this.christmasDDayDiscount = this.calculateChristmasDDayDiscount(visitDate);
//     this.weekdayDiscount = this.calculateWeekdayDiscount(visitDate, orderDetails);
//     this.weekendDiscount = this.calculateWeekendDiscount(visitDate, orderDetails);
//     this.specialDiscount = this.calculateSpecialDiscount(visitDate);

//     this.totalBenefitPrice =
//       this.christmasDDayDiscount +
//       this.weekdayDiscount +
//       this.weekendDiscount +
//       this.specialDiscount;
//   }

//   calculateChristmasDDayDiscount(visitDate) {
//     if (this.isValidDay(visitDate, NUMBER.firstDay, NUMBER.christmasDay)) {
//       return this.calculateDiscountChristmas(visitDate);
//     }
//     return 0;
//   }

//   calculateDiscountChristmas(visitDate) {
//     const discountSchedule = this.generateDiscountChristmas();
//     const index = this.calculateIndex(visitDate, 1);

//     return this.isIndexInRange(index, discountSchedule.length) ? discountSchedule[index - 1] : 0;
//   }

//   generateDiscountChristmas() {
//     const initialDiscount = 1000;
//     const commonDifference = 100;
//     const numberOfDays = NUMBER.christmasDay;

//     return Array.from(
//       { length: numberOfDays },
//       (_, index) => initialDiscount + commonDifference * index,
//     );
//   }

//   calculateWeekdayDiscount(visitDate, orderDetails) {
//     if (
//       this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
//       this.isMenuOrdered(orderDetails, MENU_LIST.디저트)
//     ) {
//       return this.calculateMenuDiscount(orderDetails, MENU_LIST.디저트, 2023);
//     }
//     return 0;
//   }

//   calculateWeekendDiscount(visitDate, orderDetails) {
//     if (
//       !this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
//       this.isMenuOrdered(orderDetails, MENU_LIST.메인)
//     ) {
//       return this.calculateMenuDiscount(orderDetails, MENU_LIST.메인, 2023);
//     }
//     return 0;
//   }

//   calculateSpecialDiscount(visitDate) {
//     return SPECIAL_DAY.includes(visitDate) ? 1000 : 0;
//   }

//   calculateMenuDiscount(orderDetails, menuList, discountRate) {
//     return orderDetails.reduce((discount, orderDetail) => {
//       const [menu, quantityString] = orderDetail.split(' ').map((item) => item.trim());
//       const quantity = parseInt(quantityString, 10);

//       return menuList.includes(menu) ? discount + discountRate * quantity : discount;
//     }, 0);
//   }

//   isWeekdayOrWeekend(visitDate, startDay, endDay) {
//     const dayNumber = this.parseDay(visitDate);
//     return (
//       this.isValidDay(visitDate, NUMBER.firstDay, NUMBER.endDay) &&
//       this.isInRange(dayNumber, startDay, endDay)
//     );
//   }

//   isMenuOrdered(orderDetails, menuList) {
//     return orderDetails.some((item) => menuList.includes(item.split(' ')[0]));
//   }

//   isValidDay(visitDate, minDay, maxDay) {
//     const dayNumber = this.parseDay(visitDate);
//     return this.isInRange(dayNumber, minDay, maxDay);
//   }

//   isIndexInRange(index, maxIndex) {
//     return index >= 0 && index < maxIndex;
//   }

//   parseDay(visitDate) {
//     return parseInt(visitDate, 10);
//   }

//   calculateIndex(visitDate, offset) {
//     return parseInt(visitDate, 10) + offset - 1;
//   }

//   isInRange(value, minValue, maxValue) {
//     return value >= minValue && value <= maxValue;
//   }
// }

// export default DiscountCalculator;

class DiscountCalculator {
  constructor(visitDate, orderDetails) {
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
    if (this.isValidDay(visitDate, NUMBER.firstDay, NUMBER.christmasDay)) {
      return this.calculateDiscountChristmas(visitDate);
    }
    return 0;
  }

  calculateDiscountChristmas(visitDate) {
    const discountSchedule = this.generateDiscountChristmas();
    const index = this.calculateIndex(visitDate, 1);

    return this.isIndexInRange(index, discountSchedule.length) ? discountSchedule[index - 1] : 0;
  }

  generateDiscountChristmas() {
    const initialDiscount = 1000;
    const commonDifference = 100;
    const numberOfDays = NUMBER.christmasDay;

    return Array.from(
      { length: numberOfDays },
      (_, index) => initialDiscount + commonDifference * index,
    );
  }

  calculateWeekdayDiscount(visitDate, orderDetails) {
    if (
      this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
      this.isMenuOrdered(orderDetails, MENU_LIST.디저트)
    ) {
      return this.calculateMenuDiscount(orderDetails, MENU_LIST.디저트, 2023);
    }
    return 0;
  }

  calculateWeekendDiscount(visitDate, orderDetails) {
    if (
      !this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
      this.isMenuOrdered(orderDetails, MENU_LIST.메인)
    ) {
      return this.calculateMenuDiscount(orderDetails, MENU_LIST.메인, 2023);
    }
    return 0;
  }

  calculateSpecialDiscount(visitDate) {
    return SPECIAL_DAY.includes(visitDate) ? 1000 : 0;
  }

  calculateMenuDiscount(orderDetails, menuList, discountRate) {
    return orderDetails.reduce((discount, orderDetail) => {
      const [menu, quantityString] = orderDetail.split(' ').map((item) => item.trim());
      const quantity = parseInt(quantityString, 10);

      return menuList.includes(menu) ? discount + discountRate * quantity : discount;
    }, 0);
  }

  isWeekdayOrWeekend(visitDate, startDay, endDay) {
    const dayNumber = this.parseDay(visitDate);
    return (
      this.isValidDay(visitDate, NUMBER.firstDay, NUMBER.endDay) &&
      this.isInRange(dayNumber, startDay, endDay)
    );
  }

  isMenuOrdered(orderDetails, menuList) {
    return orderDetails.some((item) => menuList.includes(item.split(' ')[0]));
  }

  isValidDay(visitDate, minDay, maxDay) {
    const dayNumber = this.parseDay(visitDate);
    return this.isInRange(dayNumber, minDay, maxDay);
  }

  isIndexInRange(index, maxIndex) {
    return index >= 0 && index < maxIndex;
  }

  parseDay(visitDate) {
    return parseInt(visitDate, 10);
  }

  calculateIndex(visitDate, offset) {
    return parseInt(visitDate, 10) + offset - 1;
  }

  isInRange(value, minValue, maxValue) {
    return value >= minValue && value <= maxValue;
  }
}

export default DiscountCalculator;