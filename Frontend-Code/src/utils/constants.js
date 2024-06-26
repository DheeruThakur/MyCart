
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
    },
    fetchAllUsers : {
        path : `${Domain_NAME}/api/all-users`,
        method : "GET"
    },
    updateUser : {
        path : `${Domain_NAME}/api/update-user`,
        method : "PUT"
    },
    uploadProduct : {
        path : `${Domain_NAME}/api/upload-product`,
        method : "POST"
    }
}