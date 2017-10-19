import { DEV_TOOLS_TOGGLE_VISIBILITY, DEV_TOOLS_SET_ROUTE_MODE, DEV_TOOLS_SET_FLUX_STORE_MODE } from '../actions/dev-tools-settings-actions';

// default stata
const DEV_TOOLS_SETTINGS_DEFAULT = {
    isVisible: false,
    isRoutesVisible: false,
    isFluxStoresVisible: true
}

function devToolsSettingsReducer(state = DEV_TOOLS_SETTINGS_DEFAULT, action) {
    switch (action.type) {
        case DEV_TOOLS_TOGGLE_VISIBILITY:
            return { ...state, isVisible: !state.isVisible };
        case DEV_TOOLS_SET_FLUX_STORE_MODE:
            return { ...state, isRoutesVisible: false, isFluxStoresVisible: true };
        case DEV_TOOLS_SET_ROUTE_MODE:
            return { ...state, isRoutesVisible: true, isFluxStoresVisible: false };
        default:
            return state;
    }
}

export default devToolsSettingsReducer;
