const pipes = {
    local: "http://192.168.1.100:8080",
    production: "https://boiling-temple-64575.herokuapp.com"
}

export const getBackendAPI =    () => {
    let url = pipes.production;
    if(__DEV__) {
        url = pipes.local
    }
    return url;
}

export const EXPO_PUSH_API = () => {
    return `https://exp.host/--/api/v2/push/send`;
}
