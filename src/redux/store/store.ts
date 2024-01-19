import {configureStore} from "@reduxjs/toolkit"
import MongoConnectedSlice from "./MongoConnectedSlice"
import PageLoadingSlice from "./PageLoadingSlice"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import CartSlice from "./CartSlice"
import WishlistSlice from "./WishlistSlice"


const store = configureStore({
    reducer : {
        MongoDBConnectedStatus : MongoConnectedSlice.reducer,
        PageLoading : PageLoadingSlice.reducer,
        Cart : CartSlice.reducer,
        Wishlist : WishlistSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector