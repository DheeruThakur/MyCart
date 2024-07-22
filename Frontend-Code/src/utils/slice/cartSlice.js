import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItemsCount : 0,
    cartItems : [],
}

const cartSlice = createSlice({
    name : 'cartSlice',
    initialState,
    reducers : {
        addProductCountToCart : (state , action) => {
            state.cartItemsCount = action.payload;
        },
        setCartItems : (state , action) => {
            // console.log("Action.payload" , action.payload)
            state.cartItems = action.payload;
        }
    }
})

export const {addProductCountToCart , setCartItems} = cartSlice.actions;

export default cartSlice.reducer;