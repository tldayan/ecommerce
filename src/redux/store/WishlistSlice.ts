import { createSlice } from "@reduxjs/toolkit"



const WishlistSlice = createSlice({
    name : "Wishlist",
    initialState : {quantity : 0},
    reducers : {
        addToWishlist(state) {
            return { ...state, quantity: state.quantity + 1 };
          },
          removeFromWishlist(state) {
            return { ...state, quantity: state.quantity - 1 };
          }
    }
})

export const WishlistSliceActions = WishlistSlice.actions
export default WishlistSlice