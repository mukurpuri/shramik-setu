const pipes = {
    local: "http://192.168.1.101:8080",
    production: "https://boiling-temple-64575.herokuapp.com"
}

export const getBackendAPI =    () => {
    let url = pipes.production;
    if(__DEV__) {
        url = pipes.local
    }
    return url;
}

