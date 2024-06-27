import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "sameer",
        email: "demo@gmail.com",
        numberOfTransactions: 0,
        income: 0,
        isloggedin: false
    },
    reducers: {
        //setting login status to true
        loginUser: (state) => {
            state.isloggedin = true
        },

        //setting login status to false
        logoutUser: (state) => {
            state.isloggedin = false
        },

        //changing number of transactions
        changeNumberOfTransactions: (state,action) => {
            state.numberOfTransactions += action.payload
        },

        //changing income
        changeIncome : (state,action) => {
            state.income += Number(action.payload)
        }
    }
})

export const { loginUser,logoutUser,changeNumberOfTransactions,changeIncome } = userSlice.actions;
export default userSlice.reducer;