import { SORTING_ORDERS } from '../preferences/index.constants';

export const convertedToNumberIfPossible = (string) => {
  const convertedNumber = Number(string);
  return isNaN(convertedNumber) ? string : convertedNumber;
};

export const sortByFavourites = (charactersObj, favouriteIds) => (
  Object.keys(charactersObj).sort((idA, idB) => {
    const isFavouritedA = favouriteIds.includes(idA);
    const isFavouritedB = favouriteIds.includes(idB);
    const nameA = charactersObj[idA].name;
    const nameB = charactersObj[idB].name;

    const nameSortingOrder = (nameA < nameB) ? -1 : 1;
    if (isFavouritedA) {
      return isFavouritedB ? nameSortingOrder : -1;
    }
    return isFavouritedB ? 1 : nameSortingOrder;
  })
);

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
