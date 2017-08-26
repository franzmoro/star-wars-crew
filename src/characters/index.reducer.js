import * as actionTypes from './index.actionTypes';
import * as actionUtils from '../_utility/action.utils';

const INITIAL_STATE = {
  infoObject: {},
  sortedCharacterIds: [],
  favouriteCharacterIds: [],
  isLoading: false,
  loadingError: undefined,
  expandedCharacterId: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionUtils.pendingAction(actionTypes.RETRIEVE_CHARACTERS):
      return {
        ...state,
        isLoading: true,
        loadingError: undefined,
      };
    case actionUtils.fulfilledAction(actionTypes.RETRIEVE_CHARACTERS):
      return {
        ...state,
        infoObject: action.payload,
        sortedCharacterIds: Object.keys(action.payload),
        isLoading: false,
      };
    case actionUtils.rejectedAction(actionTypes.RETRIEVE_CHARACTERS):
      return {
        ...state,
        isLoading: false,
        loadingError: action.payload.message,
      };
    // actionTypes.ADD_FAVOURITE
    // actionTypes.REMOVE_FAVOURITE

    default:
      return state;
  }
};
