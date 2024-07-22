import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../slice/userSlice";
import cartSlice from "../slice/cartSlice";

const store = configureStore({
    reducer : {
        userDetails : userSlice,
        cartDetails : cartSlice,
    }
})

export default store;