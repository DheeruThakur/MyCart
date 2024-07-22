
const DOMAIN_NAME = "http://localhost:8081";

export const endpoints = {
    signup : {
        path : `${DOMAIN_NAME}/api/signup`,
        method : "POST",
    },
    login : {
        path : `${DOMAIN_NAME}/api/login`,
        method : "POST",
    },
    userDetail : {
        path : `${DOMAIN_NAME}/api/user-detail`,
        method : "GET"
    },
    fetchAllUsers : {
        path : `${DOMAIN_NAME}/api/all-users`,
        method : "GET"
    },
    updateUser : {
        path : `${DOMAIN_NAME}/api/update-user`,
        method : "PUT"
    },
    uploadProduct : {
        path : `${DOMAIN_NAME}/api/upload-product`,
        method : "POST"
    },
    fetchAllProducts : {
        path : `${DOMAIN_NAME}/api/all-products`,
        method : "GET"
    },
    fetchProductByCategory : {
        path : `${DOMAIN_NAME}/api/product-by-categories`,
        method : "GET"
    },
    updateProduct : {
        path : `${DOMAIN_NAME}/api/update-product`,
        method : "PUT"
    },
    fetchCategoryWiseProduct : {
        path : `${DOMAIN_NAME}/api/category-wise-products`,
        method : "POST"
    },
    fetchProductDetails : {
        path : `${DOMAIN_NAME}/api/product-details/`,
        method : "GET"
    },
    addToCart : {
        path : `${DOMAIN_NAME}/api/add-to-cart`,
        method : "POST"
    },
    fetchCartItems : {
        path : `${DOMAIN_NAME}/api/cart-items`,
        method : "GET"
    },
}