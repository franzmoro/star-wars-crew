import preferencesReducer, { INITIAL_STATE } from '../index.reducer';
import * as actionTypes from '../index.actionTypes';
import { SORTING_ORDERS, SORTING_DIMENSIONS } from '../../index.constants';
import { createAction } from '../../_utility/action.utils';

describe('PREFERENCES REDUCER TESTS', () => {
  it('should return initial state if not specified', () => {
    const actualState = preferencesReducer(undefined, {});
    expect(actualState).toEqual(INITIAL_STATE);
  });

  it('should be able to set sorting dimensions', () => {
    const sortingDimension = SORTING_DIMENSIONS.height;
    const action = createAction(
      actionTypes.SET_SORTING_DIMENSION,
      sortingDimension
    );
    const actualState = preferencesReducer(INITIAL_STATE, action);
    expect(actualState).toEqual({ ...INITIAL_STATE, sortingDimension });
  });

  it('should be able to set sorting order', () => {
    const sortingOrder = 'descending';
    const action = createAction(
      actionTypes.SET_SORTING_ORDER,
      sortingOrder
    );
    const actualState = preferencesReducer(INITIAL_STATE, action);
    expect(actualState).toEqual({
      ...INITIAL_STATE,
      sortingOrder: SORTING_ORDERS[sortingOrder],
    });
  });
});
