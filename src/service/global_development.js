const SCHEMENAME = 'http://';

const DOMAIN = "tyunclient.71360.com";

function getApiUrl() {
    return SCHEMENAME + DOMAIN;
}

export default
    {
        DOMAIN,
        SCHEMENAME,
        getApiUrl
    }