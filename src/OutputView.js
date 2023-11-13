import { Console } from '@woowacourse/mission-utils';
import { BENEFIT_MESSAGE, EVENT_BADGE, PRINT_MESSAGE } from './constants.js';

const OutputView = {
  printGreeting() {
    Console.print(PRINT_MESSAGE.greeting);
  },

  printVisitDate(visitDate) {
    Console.print(`12월 ${visitDate}${PRINT_MESSAGE.previewEventBenefit}`);
  },

  printOrderMenu(orderDetails) {
    Console.print(PRINT_MESSAGE.orderMenu);
    Console.print(orderDetails.join('\n'));
  },

  printBeforeDiscountTotalOrderAmount(totalPrice) {
    Console.print(PRINT_MESSAGE.beforeDiscountTotalOrderAmount);
    Console.print(`${totalPrice.toLocaleString()}원`);
  },

  printGiveawayMenu(beforeDiscountTotalPrice) {
    Console.print(PRINT_MESSAGE.giveawayMenu);
    if (beforeDiscountTotalPrice > 120_000) {
      return Console.print(PRINT_MESSAGE.giveChampagne);
    }
    return Console.print(PRINT_MESSAGE.doesNotExist);
  },

  printBenefitDetails(discounts) {
    const { christmasDDayDiscount, weekdayDiscount, weekendDiscount, specialDiscount } = discounts;

    Console.print(PRINT_MESSAGE.benefitDetails);
    this.printChristmasDDayDiscount(christmasDDayDiscount);
    this.printWeekdayDiscount(weekdayDiscount);
    this.printWeekendDiscount(weekendDiscount);
    this.printSpecialDiscount(specialDiscount);
  },

  printChristmasDDayDiscount(christmasDDayDiscount) {
    if (christmasDDayDiscount > 0) {
      Console.print(
        `${BENEFIT_MESSAGE.christmasDDay} -${christmasDDayDiscount.toLocaleString()}원`,
      );
    }
  },

  printWeekdayDiscount(weekdayDiscount) {
    if (weekdayDiscount > 0) {
      Console.print(`${BENEFIT_MESSAGE.weekday} -${weekdayDiscount.toLocaleString()}원`);
    }
  },

  printWeekendDiscount(weekendDiscount) {
    if (weekendDiscount > 0) {
      Console.print(`${BENEFIT_MESSAGE.weekend} -${weekendDiscount.toLocaleString()}원`);
    }
  },

  printSpecialDiscount(specialDiscount) {
    if (specialDiscount > 0) {
      Console.print(`${BENEFIT_MESSAGE.special} -${specialDiscount.toLocaleString()}원`);
    }
  },

  printTotalBenefitAmount(totalBenefitPrice) {
    Console.print(PRINT_MESSAGE.totalBenefitAmount);
    if (totalBenefitPrice === 0) {
      Console.print(`${totalBenefitPrice}원`);
    } else {
      Console.print(`-${totalBenefitPrice.toLocaleString()}원`);
    }
  },

  printAfterDiscountEstimatedPaymentAmount(expectedPrice) {
    Console.print(PRINT_MESSAGE.AfterDiscountEstimatedPaymentAmount);
    Console.print(`${expectedPrice.toLocaleString()}원`);
  },

  printDecemberEventBadge(totalBenefitPrice) {
    Console.print(PRINT_MESSAGE.decemberEventBadge);
    if (totalBenefitPrice >= 20_000) {
      return Console.print(EVENT_BADGE.santa);
    }

    if (totalBenefitPrice >= 10_000) {
      return Console.print(EVENT_BADGE.tree);
    }

    if (totalBenefitPrice >= 10_000) {
      return Console.print(EVENT_BADGE.star);
    }

    return Console.print(PRINT_MESSAGE.doesNotExist);
  },

  printError(error) {
    Console.print(error.message);
  },

  printNotExist() {
    Console.print(PRINT_MESSAGE.doesNotExist);
  },
};

export default OutputView;
