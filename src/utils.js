const isIndexInRange = (index, maxIndex) => index >= 0 && index < maxIndex;

const parseDay = (visitDate) => parseInt(visitDate, 10);

const calculateIndex = (visitDate, offset) => parseInt(visitDate, 10) + offset - 1;

const isInRange = (value, minValue, maxValue) => value >= minValue && value <= maxValue;

const isValidDay = (visitDate, minDay, maxDay) => {
  const dayNumber = parseDay(visitDate);
  return isInRange(dayNumber, minDay, maxDay);
};

const isWeekdayOrWeekend = (visitDate, startDay, endDay) => {
  const dayNumber = parseDay(visitDate);
  return isValidDay(visitDate, startDay, endDay) && isInRange(dayNumber, startDay, endDay);
};

export { isIndexInRange, parseDay, calculateIndex, isInRange, isValidDay, isWeekdayOrWeekend };
