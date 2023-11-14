import InputValidator from '../src/InputValidator';
import { ERROR_MESSAGE } from '../src/constants';

describe('InputValidator에 대한 Test', () => {
  describe('방문 날짜 입력 test', () => {
    it('1 이상 31 이하의 숫자가 아닌 경우 에러를 반환한다.', () => {
      const invalidDate = '32';
      expect(() => InputValidator.visitDateInput(invalidDate)).toThrow(ERROR_MESSAGE.invalidDate);
    });

    it('유효한 방문 날짜에 대해 에러를 던지지 않고 값을 반환해야 한다.', () => {
      const validDate = '25';
      expect(() => InputValidator.visitDateInput(validDate)).not.toThrow();
      expect(validDate).toEqual('25');
    });
  });

  describe('menuCountInput', () => {
    it('유효한 주문에 대해 에러를 던지지 않고 값을 반환한다.', () => {
      const validOrder = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
      expect(() => InputValidator.menuCountInput(validOrder)).not.toThrow();
      expect(validOrder).toEqual('티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1');
    });

    it('메뉴에 없는 메뉴 주문 시 에러를 던져야 한다.', () => {
      const invalidOrder = '티본스테이크-1,바비큐립-1,초코케이크-2,사이다-1';
      expect(() => InputValidator.menuCountInput(invalidOrder)).toThrow(ERROR_MESSAGE.invalidOrder);
    });

    it('음료만 주문 시 에러를 던져야 한다.', () => {
      const invalidOrder = '제로콜라-2,레드와인-3';
      expect(() => InputValidator.menuCountInput(invalidOrder)).toThrow(ERROR_MESSAGE.invalidOrder);
    });

    it('중복된 메뉴에 대해 에러를 던져야 한다.', () => {
      const duplicateOrder = '티본스테이크-1,바비큐립-1,바비큐립-2';
      expect(() => InputValidator.menuCountInput(duplicateOrder)).toThrow(
        ERROR_MESSAGE.invalidOrder,
      );
    });

    it('최대 총 주문 개수를 초과하는 경우 에러를 던져야 한다.', () => {
      const orderExceedingMaxCount = '티본스테이크-1,바비큐립-1,제로콜라-20';
      expect(() => InputValidator.menuCountInput(orderExceedingMaxCount)).toThrow(
        ERROR_MESSAGE.invalidOrder,
      );
    });
  });
});
