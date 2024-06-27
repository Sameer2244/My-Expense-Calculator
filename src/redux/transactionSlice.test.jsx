import { describe, expect, it } from 'vitest';
import transactionsSlice, { addTransaction, calculateTotalExpense } from './transactionSlice'; // Assuming this is where the transaction logic is

describe('transactionsReducer', () => {
    it('should handle ADD_TRANSACTION action', () => {

        //initial state
        const initialState = {
            transactions: [],
            expense: 0
        };

        //new transaction to be added
        const newTransaction = {
            id: 1,
            type: 'income',
            category: 'Salary',
            amount: 1000,
            date: '2024-06-27'
        };

        //transaction is adding here
        const action = addTransaction(newTransaction);

        //updating state here
        const newState = transactionsSlice(initialState, action);

        //checking if updated state is correct or not
        expect(newState).toEqual({
            transactions: [newTransaction],
            expense: 0
        });
    });

    it("calculate expense", () => {
        //initial state
        const initialState = {
            transactions: [
                {
                    id: 1,
                    type: 'income',
                    category: 'Salary',
                    amount: 1000,
                    date: '2024-06-27'
                },
                {
                    id: 2,
                    type: 'income',
                    category: 'Salary',
                    amount: 1000,
                    date: '2024-06-27'
                }
            ],
            expense: 0
        }

        //calculate total expense
        const action = calculateTotalExpense()

        //updating state
        const newState = transactionsSlice(initialState, action)

        //checking if updated state is correct or not
        expect(newState).toEqual({
            transactions: [{
                id: 1,
                type: 'income',
                category: 'Salary',
                amount: 1000,
                date: '2024-06-27'
            },
            {
                id: 2,
                type: 'income',
                category: 'Salary',
                amount: 1000,
                date: '2024-06-27'
            }],
            expense: 2000
        })
    })
});