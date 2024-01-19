import { createSlice } from "@reduxjs/toolkit";


const PageLoadingSlice = createSlice({
    name : "PageLoading",
    initialState : {isPageLoading : false},
    reducers : {
        setIsPageLoading(state,action) {
            state.isPageLoading = action.payload
        }
    }
})


export const PageLoadingActions = PageLoadingSlice.actions

export default PageLoadingSlice