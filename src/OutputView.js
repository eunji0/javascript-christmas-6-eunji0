import { Console } from '@woowacourse/mission-utils';
import {
  BADGE_STANDARD_PRICE,
  BENEFIT_MESSAGE,
  EVENT_BADGE,
  MENU_PRICES,
  PRINT_MESSAGE,
  GIFT_EVENT_STANDARD,
} from './constants.js';

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
    Console.print(
      beforeDiscountTotalPrice >= GIFT_EVENT_STANDARD
        ? PRINT_MESSAGE.giveChampagne
        : PRINT_MESSAGE.doesNotExist,
    );
  },

  printBenefitDetails(discountCalculator, beforeDiscountTotalPrice) {
    Console.print(PRINT_MESSAGE.benefitDetails);

    if (discountCalculator.totalBenefitPrice === 0) {
      Console.print(PRINT_MESSAGE.doesNotExist);
      return;
    }

    this.printChristmasDDayDiscount(discountCalculator.christmasDDayDiscount);
    this.printWeekdayDiscount(discountCalculator.weekdayDiscount);
    this.printWeekendDiscount(discountCalculator.weekendDiscount);
    this.printSpecialDiscount(discountCalculator.specialDiscount);
    this.printGiftMenuPrice(beforeDiscountTotalPrice);
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

  printGiftMenuPrice(beforeDiscountTotalPrice) {
    if (beforeDiscountTotalPrice >= GIFT_EVENT_STANDARD) {
      Console.print(`${BENEFIT_MESSAGE.giveEvent} -${MENU_PRICES.샴페인.toLocaleString()}원`);
    }
  },

  printTotalBenefitAmount(totalBenefitPrice) {
    Console.print(PRINT_MESSAGE.totalBenefitAmount);
    Console.print(
      totalBenefitPrice === 0
        ? `${totalBenefitPrice}원`
        : `-${totalBenefitPrice.toLocaleString()}원`,
    );
  },

  printAfterDiscountEstimatedPaymentAmount(expectedPrice) {
    Console.print(PRINT_MESSAGE.AfterDiscountEstimatedPaymentAmount);
    Console.print(`${expectedPrice.toLocaleString()}원`);
  },

  printDecemberEventBadge(totalBenefitPrice) {
    Console.print(PRINT_MESSAGE.decemberEventBadge);

    const events = [
      { threshold: BADGE_STANDARD_PRICE.santaBadge, badge: EVENT_BADGE.santa },
      { threshold: BADGE_STANDARD_PRICE.treeBadge, badge: EVENT_BADGE.tree },
      { threshold: BADGE_STANDARD_PRICE.starBadge, badge: EVENT_BADGE.star },
    ];

    const matchingEvent = events.find((event) => totalBenefitPrice >= event.threshold);
    Console.print(matchingEvent ? matchingEvent.badge : PRINT_MESSAGE.doesNotExist);
  },

  printError(error) {
    Console.print(error.message);
  },

  printNotExist() {
    Console.print(PRINT_MESSAGE.doesNotExist);
  },
};

export default OutputView;
