export const setLanguage = language => ({
    type: 'SET_LANGUAGE',
    language: language,
});
export const toggleLoader = () => ({
    type: 'TOGGLE_LOADER'
});

export const SetTab = tabType => {
    return ({
        type: 'SET_CONNECT_TAB',
        tabType
    })
    
}

export const SetSearchRange = range => {
    return ({
        type: 'SET_SEARCH_RANGE',
        range
    })
    
}

export const SetExpoToken = token => {
    return ({
        type: 'SET_EXPO_TOKEN',
        token
    })
    
}

