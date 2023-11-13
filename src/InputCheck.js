import { NUMBER, ERROR_MESSAGE, MENU_LIST } from './constants.js';

const checkInputFormat = (input, errorMessage) => {
  if (input === undefined) {
    throw new Error(`${ERROR_MESSAGE.errorText}${errorMessage}`);
  }
};

const checkInputType = (input, errorMessage) => {
  if (!/^\d+$/.test(input)) {
    throw new Error(`${ERROR_MESSAGE.errorText}${errorMessage}`);
  }
};

// 각 주문 항목을 유효성 검사하는 함수
const checkValidateOrderItem = (orderItem) => {
  const [menu, quantity] = orderItem.split('-').map((item) => item.trim());
  const isMenuValid = Object.values(MENU_LIST).flat().includes(menu);

  if (!isMenuValid || Number.isNaN(quantity) || quantity < NUMBER.orderQuantity) {
    throw new Error(`${ERROR_MESSAGE.errorText}${ERROR_MESSAGE.invalidOrder}`);
  }

  return { menu, quantity: Number(quantity) };
};

// 주문 내 중복된 메뉴와 음료만 주문시 확인하는 함수
const checkForDuplicateMenus = (orderDetails) => {
  const uniqueMenus = new Set(orderDetails.map((item) => item.menu));
  if (uniqueMenus.size !== orderDetails.length) {
    throw new Error(`${ERROR_MESSAGE.errorText}${ERROR_MESSAGE.invalidOrder}`);
  }

  const notDrink = new Set(
    orderDetails.filter((item) => !MENU_LIST.음료.includes(item.menu)).map((item) => item.menu),
  );

  if ([...notDrink].length === 0) {
    throw new Error(`${ERROR_MESSAGE.errorText}${ERROR_MESSAGE.invalidOrder}`);
  }
};

// 날짜가 유효한지 확인하는 함수
const checkValidDate = (date) => {
  checkInputFormat(date, ERROR_MESSAGE.invalidDate);
  checkInputType(date, ERROR_MESSAGE.invalidDate);

  const numericDate = parseInt(date, 10);
  if (numericDate < NUMBER.firstDay || numericDate > NUMBER.endDay) {
    throw new Error(`${ERROR_MESSAGE.errorText}${ERROR_MESSAGE.invalidDate}`);
  }
};

// 전체 주문의 유효성을 확인하는 함수
const checkValidOrder = (order) => {
  checkInputFormat(order, ERROR_MESSAGE.invalidOrder);

  const orderDetails = order.split(',').map(checkValidateOrderItem);

  checkForDuplicateMenus(orderDetails);

  return orderDetails;
};

const validateTotalItems = (quantity) => {
  const totalItems = quantity.reduce((total, item) => total + Number(item), 0);
  if (totalItems > NUMBER.maxTotalMenuCount) {
    throw new Error(
      `${ERROR_MESSAGE.errorText}${ERROR_MESSAGE.invalidOrder} 주문할 수 있는 최대 개수는 ${NUMBER.maxTotalMenuCount}개입니다.`,
    );
  }
};

const InputCheck = {
  checkInputFormat,
  checkInputType,
  checkValidDate,
  checkValidOrder,
  validateTotalItems,
};

export default InputCheck;
