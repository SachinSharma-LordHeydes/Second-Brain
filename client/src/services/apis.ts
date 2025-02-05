
const baseURL=import.meta.env.VITE_BACKEND_URL;

export const authEndpoint={
    SIGNIN_URL:baseURL+"/signin",
    SIGNUP_URL:baseURL+"/signup"
}

export const dataEndpoint={
    BRAIN_DATA_URL:baseURL+"/content",
    SHAREABLE_BRAIN_DATA_URL:baseURL+"/shareable",
}

export const linkEndpoint={
    GET_LINK:baseURL+"/link"
}