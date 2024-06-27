import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./combinedReducers";


//configuring store with combined reducers
export const store = configureStore({
    reducer: rootReducer,
});
