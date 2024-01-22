import { createSlice } from "@reduxjs/toolkit"



const AuthStateSlice = createSlice({
    name : "Auth",
    initialState : {isAuth : false, isLoggingIn : false},
    reducers : {
        setAuth(state) {
            if(state.isAuth) {
               state.isAuth = false 
            } else {
                state.isAuth = true
            }
        },

        setType(state,action) {
            if(action.payload === "login") {
                state.isLoggingIn = true
            } else {
                state.isLoggingIn = false
            }
        }
    }
})

export const AuthStateSliceActions = AuthStateSlice.actions
export default AuthStateSlice