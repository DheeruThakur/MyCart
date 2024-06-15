
const Domain_NAME = "http://localhost:8081";

export const endpoints = {
    signup : {
        path : `${Domain_NAME}/api/signup`,
        method : "POST",
    },
    login : {
        path : `${Domain_NAME}/api/login`,
        method : "POST",
    },
    userDetail : {
        path : `${Domain_NAME}/api/user-detail`,
        method : "GET"
    }
}