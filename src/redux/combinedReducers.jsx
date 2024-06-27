import userSlice from "./userSlice"
import transactionSlice from "./transactionSlice"
import { combineReducers } from "@reduxjs/toolkit";

//combining slices into one reducer
export const rootReducer = combineReducers({
    user: userSlice,
    transaction: transactionSlice,
});