import _ from 'lodash';
const initialState = {
    settings: {
        language: "en",
        screenloading: false,
        range: 100,
        connectTab: "people",
        expoToken: null,
    }
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE': {
            return {
              ...state,
              settings: setSelectErrorText(state.settings, action.language),
            }
        }

        case 'TOGGLE_LOADER': {
            return {
              ...state,
              settings: toggleLoeader(state.settings, action.status),
            }
        }

        case 'SET_CONNECT_TAB': {
            return {
              ...state,
              settings: setTabType(state.settings, action.tabType),
            }
        }

        case 'SET_SEARCH_RANGE': {
            return {
                ...state,
                settings: setSearchRange(state.settings, action.range),
              }
        }

        case 'SET_EXPO_TOKEN': {
            return {
                ...state,
                settings: setExpoToken(state.settings, action.token),
              }
        }

        default: {
            return state;
        }
    }
}
function toggleLoeader(data, status) {
    const newData = Object.assign({}, data);
    newData.screenloading = !newData.screenloading;
    return newData;
}
function setTabType(data, type) {
    const newData = Object.assign({}, data);
    newData.connectTab = type;
    return newData;
}
function setSelectErrorText(data, language) {
    const newData = Object.assign({}, data);
    newData.language = language;
    return newData;
}
function setSearchRange(data, range) {
    const newData = Object.assign({}, data);
    newData.range = range;
    return newData;
}

function setExpoToken(data, token) {
    const newData = Object.assign({}, data);
    newData.expoToken = token;
    return newData;
}

export default userReducer;