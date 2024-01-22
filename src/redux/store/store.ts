import {configureStore} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import CartSlice from "./CartSlice"
import WishlistSlice from "./WishlistSlice"
import AuthStateSlice from "./AuthStateSlice"


const store = configureStore({
    reducer : {
        Cart : CartSlice.reducer,
        Wishlist : WishlistSlice.reducer,
        Auth : AuthStateSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector