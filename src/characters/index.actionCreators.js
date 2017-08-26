import { createAction } from '../_utility/action.utils';
import * as actionTypes from './index.actionTypes';
import * as charactersApi from './index.api';

export const retrieveCharacters = () => createAction(
  actionTypes.RETRIEVE_CHARACTERS,
  { promise: charactersApi.getAllCharacters() }
);

export const addFavourite = id => createAction(actionTypes.ADD_FAVOURITE, id);

export const removeFavourite = id => createAction(
  actionTypes.REMOVE_FAVOURITE,
  id
);
