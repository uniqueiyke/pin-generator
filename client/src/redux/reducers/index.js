import { combineReducers } from 'redux';
import scratchCardReducer from './scratch-card-reducer';
import userReducer from './user-reducer'

export default combineReducers({
  cards: scratchCardReducer,
  user: userReducer
});