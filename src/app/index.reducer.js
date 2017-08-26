import { combineReducers } from 'redux';
import charactersReducer from '../characters/index.reducer';
import preferencesReducer from '../preferences/index.reducer';

export default combineReducers({
  characters: charactersReducer,
  preferences: preferencesReducer,
});
