import { createAction } from '../_utility/action.utils';
import * as actionTypes from './index.actionTypes';

export const setSortingDimension = dimension => createAction(
  actionTypes.SET_SORTING_DIMENSION,
  dimension
);
export const setSortingOrder = order => createAction(
  actionTypes.SET_SORTING_ORDER,
  order
);
