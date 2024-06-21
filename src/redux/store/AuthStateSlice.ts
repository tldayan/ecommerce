import { createSlice } from "@reduxjs/toolkit"

let isResettingPassword

if (typeof window !== 'undefined') {
  isResettingPassword = window.location.href.includes('/resetpassword');
}

const AuthStateSlice = createSlice({
    name : "Auth",
    initialState : {isAuth : isResettingPassword ? true : false, isLoggingIn : false},
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