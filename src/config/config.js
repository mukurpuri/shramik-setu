const pipes = {
    local: "http://localhost:1923",
    production: ""
}

export const getBackendAPI = () => {
    let url = pipes.local;
    let currentURL = window.location.href;
    // if(!(currentURL.indexOf("localhost:") >= 0)) {
    //     url = pipes.production;
    // }
    return url;
}

