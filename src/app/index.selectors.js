import * as charactersSelectors from '../characters/index.selectors';
import * as preferencesSelectors from '../preferences/index.selectors';

export const getCharacters = (state = {}) => charactersSelectors.getCharacters(state.characters);
export const getFavouriteCharacterIds = (state = {}) => charactersSelectors.getFavouriteCharacterIds(state.characters);
export const isLoadingCharacters = (state = {}) => charactersSelectors.isLoadingCharacters(state.characters);
export const getLoadingError = (state = {}) => charactersSelectors.getLoadingError(state.characters);
export const getModalCharacterId = (state = {}) => charactersSelectors.getModalCharacterId(state.characters);

export const getSortingDimension = (state = {}) => preferencesSelectors.getSortingDimension(state.preferences);
export const getSortingOrder = (state = {}) => preferencesSelectors.getSortingOrder(state.preferences);
