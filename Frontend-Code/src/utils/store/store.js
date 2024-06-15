import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../slice/userSlice";

const store = configureStore({
    reducer : {
        userDetails : userSlice,
    }
})

export default store;