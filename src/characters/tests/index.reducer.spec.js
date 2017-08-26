import charactersReducer, { INITIAL_STATE } from '../index.reducer';
import * as actionTypes from '../index.actionTypes';
import { createAction } from '../../_utility/action.utils';

describe('CHARACTERS REDUCER TESTS', () => {
  describe('should return initial state if not specified', () => {
    it('', () => {
      const actualState = charactersReducer(undefined, {});
      expect(actualState).toEqual(INITIAL_STATE);
    });
  });

  describe('should respond to actions', () => {
    let startingState;
    beforeEach(() => {
      startingState = {
        ...INITIAL_STATE,
        favouriteCharacterIds: [1, 88, 9, 54, 57],
      };
    });

    it('should be able to add a favourite', () => {
      const favouriteCharacterId = 10;
      const action = createAction(
        actionTypes.ADD_TO_FAVOURITES,
        favouriteCharacterId
      );

      const actualState = charactersReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        favouriteCharacterIds: [...startingState.favouriteCharacterIds, 10],
      });
    });

    it('should be able to remove a favourite', () => {
      const favouriteCharacterId = 57;
      const action = createAction(
        actionTypes.REMOVE_FROM_FAVOURITES,
        favouriteCharacterId
      );
      const actualState = charactersReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        favouriteCharacterIds: startingState.favouriteCharacterIds.slice(0, -1),
      });
    });

    it('should be able to open modal', () => {
      const characterId = 57;
      const action = createAction(
        actionTypes.TOGGLE_MODAL_STATUS,
        characterId
      );
      const actualState = charactersReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        modalCharacterId: characterId,
      });
    });

    it('should be able to close modal', () => {
      const action = createAction(actionTypes.TOGGLE_MODAL_STATUS);
      const actualState = charactersReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        modalCharacterId: undefined,
      });
    });
  });
});
