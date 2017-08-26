import _ from 'lodash';
import * as actionTypes from './index.actionTypes';
import * as actionUtils from '../_utility/action.utils';

export const INITIAL_STATE = {
  characters: {},
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
        characters: action.payload,
        isLoading: false,
      };
    case actionUtils.rejectedAction(actionTypes.RETRIEVE_CHARACTERS):
      return {
        ...state,
        isLoading: false,
        loadingError: action.payload.message,
      };

    case actionTypes.ADD_TO_FAVOURITES:
      return {
        ...state,
        favouriteCharacterIds: _.uniq(
          [...state.favouriteCharacterIds, action.payload]
        ),
      };

    case actionTypes.REMOVE_FROM_FAVOURITES:
      return {
        ...state,
        favouriteCharacterIds: state.favouriteCharacterIds.filter(
          id => id !== action.payload
        ),
      };

    default:
      return state;
  }
};
