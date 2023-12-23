


import {createSlice} from "@reduxjs/toolkit"



const MongoConnectedSlice = createSlice({

    name : "MongoDBConnectedStatus",
    initialState : {connected: false},
    reducers : {
        setConnectedState(state,action) {
            state.connected = action.payload
        }
    }

})

export const MongoActions = MongoConnectedSlice.actions

export default MongoConnectedSlice