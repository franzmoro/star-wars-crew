import * as actionUtils from '../_utility/action.utils';
import * as actionTypes from './index.actionTypes';
import * as charactersApi from './index.api';

export const retrieveCharacters = () => actionUtils.createAction(
  actionTypes.RETRIEVE_CHARACTERS,
  { promise: charactersApi.getAllCharacters() }
);
