import { combineReducers } from 'redux';
import  settings from './dev-tools-settings-reducer';
import  pushQuestion from './push-question-reducer';

const devToolsReducer = combineReducers({
  settings: settings,
  pushQuestion: pushQuestion
});

export default devToolsReducer;
