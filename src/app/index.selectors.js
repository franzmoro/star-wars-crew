import * as characterSelectors from '../characters/index.selectors';

export const getCharacters = (state = {}) => characterSelectors.getCharacters(state.characters);
export const getFavouriteCharacterIds = (state = {}) => characterSelectors.getFavouriteCharacterIds(state.characters);
export const getSortedCharacterIds = (state = {}) => characterSelectors.getSortedCharacterIds(state.characters);
export const isLoadingCharacters = (state = {}) => characterSelectors.isLoadingCharacters(state.characters);
export const getLoadingError = (state = {}) => characterSelectors.getLoadingError(state.characters);
export const getExpandedCharacterId = (state = {}) => characterSelectors.getExpandedCharacterId(state.characters);
