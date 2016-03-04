import {DEV_TOOLS_TOGGLE_VISIBILITY} from '../actions/dev-tools-settings-actions';
const DEV_TOOLS_SETTINGS_DEFAULT = {
  isVisible: false
}

function devToolsSettingsReducer(state = DEV_TOOLS_SETTINGS_DEFAULT, action){
  switch (action.type) {
   case DEV_TOOLS_TOGGLE_VISIBILITY:
       return { ...state, isVisible: !state.isVisible};
   default:
       return state;
   }
}

export default devToolsSettingsReducer;
