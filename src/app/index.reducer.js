import { combineReducers } from 'redux';
import charactersReducer from '../characters/index.reducer';

export default combineReducers({
  characters: charactersReducer,
  preferences: () => ({}),
});
