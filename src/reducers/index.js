import { combineReducers } from 'redux';
import settings from './dev-tools-settings-reducer';

const devToolsReducer = combineReducers({
    settings: settings
});

export default devToolsReducer;
