import { createAction } from '../_utility/action.utils';
import * as actionTypes from './index.actionTypes';
import * as charactersApi from './index.api';

export const retrieveCharacters = () => createAction(
  actionTypes.RETRIEVE_CHARACTERS,
  { promise: charactersApi.getAllCharacters() }
);

export const addToFavourites = id => createAction(actionTypes.ADD_TO_FAVOURITES, id);

export const removeFromFavourites = id => createAction(
  actionTypes.REMOVE_FROM_FAVOURITES,
  id
);
