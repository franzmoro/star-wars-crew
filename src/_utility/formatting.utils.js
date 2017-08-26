export const convertedToNumberIfPossible = (string) => {
  const convertedNumber = Number(string);
  return isNaN(convertedNumber) ? string : convertedNumber;
};
