import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
}

const userSlice = createSlice({
    name : "userSlice",
    initialState,
    reducers : {
        setUserDetail : (state , action) => {
            state.user = action.payload;
        },
        clearUserDetails : (state) => {
            state.user = null
        }
    }
})

export const { setUserDetail, clearUserDetails } = userSlice.actions

export default userSlice.reducer