import _ from 'lodash';
const initialState = {
    settings: {
        language: "hi",
        screenloading: false
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
function setSelectErrorText(data, language) {
    const newData = Object.assign({}, data);
    newData.language = language;
    return newData;
}
export default userReducer;