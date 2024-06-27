import { createSlice } from "@reduxjs/toolkit";

export const transactionListSlice = createSlice({
    name: "transactionList",
    initialState: {
        transactions: [],
        expense: 0
    },
    reducers: {
        //add transaction
        addTransaction: (state, action) => {
            state.transactions.push(action.payload)
        },

        //add bunch of transactions at once
        addBunchOfTransactions: (state, action) => {
            state.transactions = action.payload
        },

        //calculate total expense
        calculateTotalExpense: (state) => {
            let expense = 0
            state.transactions.forEach((transaction) => {
                if (transaction.category != "Salary") {
                    expense += Number(transaction.amount)
                }
            })
            state.expense = expense
        },

        //delete transaction
        deleteTransaction: (state, action) => {
            const transactionIdtoDelete = action.payload
            const transactionTodelete = state.transactions.find(transaction => {
                transaction.id == transactionIdtoDelete
            })
            state.transactions.splice(state.transactions.indexOf(transactionTodelete), 1)
        }
    }
})

export const { addTransaction, addBunchOfTransactions, calculateTotalExpense, deleteTransaction } = transactionListSlice.actions;
export default transactionListSlice.reducer;