import { createSlice, PayloadAction } from "@reduxjs/toolkit"



const CartSlice = createSlice({
    name : "Cart",
    initialState : {cartQuantity : 0},
    reducers : {
        cartCountIncrement(state) {
            return { ...state, cartQuantity : state.cartQuantity + 1 };
        },

        cartCountDecrement(state) {
            return { ...state, cartQuantity : state.cartQuantity - 1 };
        }

    }
})

export const CartSliceActions = CartSlice.actions
export default CartSlice