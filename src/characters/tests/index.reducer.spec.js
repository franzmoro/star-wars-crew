import charactersReducer, { INITIAL_STATE } from '../index.reducer';

describe('CHARACTERS REDUCER TESTS', () => {
  describe('should return initial state if not specified', () => {
    it('', () => {
      const actualState = charactersReducer(undefined, {});
      expect(actualState).toEqual(INITIAL_STATE);
    });
  });
});
