import { NUMBER, MENU_LIST, SPECIAL_DAY } from './constants.js';

class DiscountCalculator {
  constructor(visitDate) {
    // 할인 정보 초기화
    this.christmasDDayDiscount = 0;
    this.weekdayDiscount = 0;
    this.weekendDiscount = 0;
    this.specialDiscount = 1000;
    this.totalBenefitPrice = 0;
    this.visitDate = visitDate;
  }

  /**
   * 방문 날짜에 따른 할인을 계산합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 31일까지)
   * @param {string[]} orderDetails - 주문 내역 배열
   */
  calculateDiscounts(visitDate, orderDetails) {
    // 크리스마스 D-Day 할인 계산
    this.calculateChristmasDDayDiscount(visitDate);

    // 주중 할인 계산
    this.calculateWeekdayDiscount(visitDate, orderDetails);

    // 주말 할인 계산
    this.calculateWeekendDiscount(visitDate, orderDetails);

    // 특별 할인 계산
    this.calculateSpecialDiscount(visitDate);

    // 총 할인 금액 계산
    this.totalBenefitPrice =
      this.christmasDDayDiscount +
      this.weekdayDiscount +
      this.weekendDiscount +
      this.specialDiscount;

    return this.totalBenefitPrice;
  }

  /**
   * 크리스마스 D-Day 할인을 계산합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 25일까지)
   * @returns {number} - 할인 금액
   */
  calculateChristmasDDayDiscount(visitDate) {
    if (this.isValidDay(visitDate, NUMBER.firstDay, NUMBER.christmasDay)) {
      this.christmasDDayDiscount = this.calculateDiscountChristmas(visitDate);
      return this.christmasDDayDiscount;
    }
    return false;
  }

  /**
   * 크리스마스 D-Day 할인을 누적 할인 규칙을 사용하여 계산합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 25일까지)
   * @returns {number} - 할인 금액
   */
  calculateDiscountChristmas(visitDate) {
    const discountSchedule = this.generateDiscountChristmas();
    const index = this.calculateIndex(visitDate, 1);

    return this.isIndexInRange(index, discountSchedule.length) ? discountSchedule[index] : 0;
  }

  /**
   * 크리스마스 D-Day 할인의 누적 할인 규칙을 생성합니다.
   * @returns {number[]} - 누적 할인 규칙 배열
   */
  generateDiscountChristmas() {
    const initialDiscount = 1000;
    const commonDifference = 100;
    const numberOfDays = NUMBER.christmasDay;

    return Array.from(
      { length: numberOfDays },
      (_, index) => initialDiscount + commonDifference * index,
    );
  }

  /**
   * 주중 할인을 계산합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 31일까지)
   * @param {string[]} orderDetails - 주문 내역 배열
   * @returns {number} - 할인 금액
   */
  calculateWeekdayDiscount(visitDate, orderDetails) {
    if (
      this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
      this.isMenuOrdered(orderDetails, MENU_LIST.디저트)
    ) {
      // 각 주문된 메뉴에 대해 할인 계산
      this.weekdayDiscount = this.calculateMenuDiscount(orderDetails, MENU_LIST.디저트, 2023);
      return this.weekdayDiscount;
    }

    return false;
  }

  /**
   * 주말 할인을 계산합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 31일까지)
   * @param {string[]} orderDetails - 주문 내역 배열
   * @returns {number} - 할인 금액
   */
  calculateWeekendDiscount(visitDate, orderDetails) {
    if (
      !this.isWeekdayOrWeekend(visitDate, NUMBER.weekdayDivisionFrom, NUMBER.weekdayDivisionTo) &&
      this.isMenuOrdered(orderDetails, MENU_LIST.메인)
    ) {
      // 각 주문된 메뉴에 대해 할인 계산
      this.weekendDiscount = this.calculateMenuDiscount(orderDetails, MENU_LIST.메인, 2023);
      return this.weekendDiscount;
    }

    return false;
  }

  /**
   * 특별 할인을 계산합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 31일까지)
   * @returns {number} - 할인 금액
   */
  calculateSpecialDiscount(visitDate) {
    this.specialDiscount = SPECIAL_DAY.includes(visitDate) ? 1000 : 0;
    return this.specialDiscount;
  }

  /**
   * 메뉴별 할인을 계산합니다.
   * @param {string[]} orderDetails - 주문 내역 배열
   * @param {string[]} menuList - 할인 대상 메뉴 리스트
   * @param {number} discountRate - 할인율
   * @returns {number} - 할인 금액
   */
  calculateMenuDiscount(orderDetails, menuList, discountRate) {
    return orderDetails.reduce((discount, orderDetail) => {
      const [menu, quantityString] = orderDetail.split(' ').map((item) => item.trim());
      const quantity = parseInt(quantityString, 10);

      return menuList.includes(menu) ? discount + discountRate * quantity : discount;
    }, 0);
  }

  /**
   * 주중 또는 주말인지 판단합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 31일까지)
   * @param {number} startDay - 주중 시작 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
   * @param {number} endDay - 주말 종료 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
   * @returns {boolean} - 주중이면 true, 주말이면 false
   */
  isWeekdayOrWeekend(visitDate, startDay, endDay) {
    const dayNumber = this.parseDay(visitDate);
    return (
      this.isValidDay(visitDate, NUMBER.firstDay, NUMBER.endDay) &&
      this.isInRange(dayNumber, startDay, endDay)
    );
  }

  /**
   * 주문된 메뉴 중에서 특정 메뉴가 있는지 확인합니다.
   * @param {string[]} orderDetails - 주문 내역 배열
   * @param {string[]} menuList - 확인할 메뉴 리스트
   * @returns {boolean} - 특정 메뉴가 있으면 true, 없으면 false
   */
  isMenuOrdered(orderDetails, menuList) {
    return orderDetails.some((item) => menuList.includes(item.split(' ')[0]));
  }

  /**
   * 날짜의 유효성을 확인합니다.
   * @param {string} visitDate - 방문 날짜 (1일부터 31일까지)
   * @param {number} minDay - 허용되는 최소 날짜
   * @param {number} maxDay - 허용되는 최대 날짜
   * @returns {boolean} - 날짜가 유효하면 true, 아니면 false
   */
  isValidDay(visitDate, minDay, maxDay) {
    const dayNumber = this.parseDay(visitDate);
    return this.isInRange(dayNumber, minDay, maxDay);
  }

  /**
   * 배열 인덱스가 허용 범위 내에 있는지 확인합니다.
   * @param {number} index - 확인할 배열 인덱스
   * @param {number} maxIndex - 허용되는 최대 인덱스
   * @returns {boolean} - 인덱스가 허용 범위 내에 있으면 true, 아니면 false
   */
  isIndexInRange(index, maxIndex) {
    return index >= 0 && index < maxIndex;
  }

  /**
   * 날짜 문자열을 숫자로 파싱합니다.
   * @param {string} visitDate - 방문 날짜 문자열 (1일부터 31일까지)
   * @returns {number} - 날짜 숫자
   */
  parseDay(visitDate) {
    return parseInt(visitDate, 10);
  }

  /**
   * 인덱스를 계산합니다.
   * @param {number} visitDate - 방문 날짜
   * @param {number} offset - 날짜 오프셋
   * @returns {number} - 계산된 인덱스
   */
  calculateIndex(visitDate, offset) {
    return parseInt(visitDate, 10) + offset - 1;
  }

  /**
   * 값이 주어진 범위 내에 있는지 확인합니다.
   * @param {number} value - 확인할 값
   * @param {number} minValue - 허용되는 최소 값
   * @param {number} maxValue - 허용되는 최대 값
   * @returns {boolean} - 값이 허용 범위 내에 있으면 true, 아니면 false
   */
  isInRange(value, minValue, maxValue) {
    return value >= minValue && value <= maxValue;
  }

  /**
   * 총 할인 금액을 반환합니다.
   * @returns {number} - 총 할인 금액
   */
  getTotalBenefitPrice() {
    return this.totalBenefitPrice;
  }

  /**
   * 크리스마스 D-Day 할인 금액을 반환합니다.
   * @returns {number} - 크리스마스 D-Day 할인 금액
   */
  getChristmasDDayDiscount() {
    return this.christmasDDayDiscount;
  }

  /**
   * 주중 할인 금액을 반환합니다.
   * @returns {number} - 주중 할인 금액
   */
  getWeekdayDiscount() {
    return this.weekdayDiscount;
  }

  /**
   * 주말 할인 금액을 반환합니다.
   * @returns {number} - 주말 할인 금액
   */
  getWeekendDiscount() {
    return this.weekendDiscount;
  }

  /**
   * 특별 할인 금액을 반환합니다.
   * @returns {number} - 특별 할인 금액
   */
  getSpecialDiscount() {
    return this.specialDiscount;
  }
}

export default DiscountCalculator;
