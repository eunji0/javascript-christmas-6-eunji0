import { NUMBER } from './constants.js';

const isIndexInRange = (index, maxIndex) => index >= 0 && index < maxIndex;

const parseDay = (visitDate) => parseInt(visitDate, 10);

const calculateIndex = (visitDate, offset) => parseInt(visitDate, 10) + offset - 1;

const isInRange = (value, minValue, maxValue) => value >= minValue && value <= maxValue;

const isValidDay = (visitDate, minDay, maxDay) => {
  const dayNumber = parseDay(visitDate);
  return isInRange(dayNumber, minDay, maxDay);
};

const isWeekdayOrWeekend = (visitDate) => {
  const dayNumber = parseDay(visitDate);
  const isWeekend =
    dayNumber % NUMBER.oneWeek === NUMBER.weekendDivisionFrom ||
    dayNumber % NUMBER.oneWeek === NUMBER.weekendDivisionTo;

  return isWeekend;
};

export { isIndexInRange, parseDay, calculateIndex, isInRange, isValidDay, isWeekdayOrWeekend };
