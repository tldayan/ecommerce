import {configureStore} from "@reduxjs/toolkit"
import MongoConnectedSlice from "./MongoConnectedSlice"



const store = configureStore({
    reducer : {
        MongoDBConnectedStatus : MongoConnectedSlice.reducer
    }
})

export default store