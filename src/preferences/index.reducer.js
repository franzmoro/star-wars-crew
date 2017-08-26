import * as actionTypes from './index.actionTypes';
import { SORTING_DIMENSIONS, SORTING_ORDERS } from './index.constants';

export const INITIAL_STATE = {
  sortingDimension: SORTING_DIMENSIONS.Name,
  sortingOrder: SORTING_ORDERS.ascending,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_SORTING_DIMENSION:
      return {
        ...state,
        sortingDimension: SORTING_DIMENSIONS[action.payload],
      };

    case actionTypes.SET_SORTING_ORDER:
      return {
        ...state,
        sortingOrder: SORTING_ORDERS[action.payload],
      };

    default:
      return state;
  }
};
