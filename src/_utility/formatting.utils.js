import { SORTING_ORDERS } from '../preferences/index.constants';

export const convertedToNumberIfPossible = (string) => {
  const convertedNumber = Number(string);
  return isNaN(convertedNumber) ? string : convertedNumber;
};

export const sortCharacters = (charactersObj, dimension, order = 'ASC') => (
  Object.keys(charactersObj).sort((idA, idB) => {
    const valueA = charactersObj[idA][dimension];
    const valueB = charactersObj[idB][dimension];
    let result;

    if (order === SORTING_ORDERS.ascending) {
      result = (valueA < valueB) ? -1 : 1;
    } else {
      result = (valueA > valueB) ? -1 : 1;
    }
    return result;
  })
);
