import { Alert, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
import TransactionTable from './TransactionTable'
import { calculateTotalExpense } from '../redux/transactionSlice'
import AddTransaction from './AddTransaction'

export default function UserDashboard() {

    const dispatch = useDispatch()

    // getting user data
    const name = useSelector(state => state.user.name)
    const income = useSelector(state => state.user.income)

    // getting transaction data
    const expense = useSelector(state => state.transaction.expense)
    const numberOfTransactions = useSelector(state => state.transaction.transactions)
    
    useEffect(() => {
        //calculating total expense for the first time.
        dispatch(calculateTotalExpense())
    }, [])

    return (
        <div className='user-dashboard'>
            <h1>User Dashboard</h1>
            <div>
                <h3>Welcome {name}</h3>
                <h3>Balance : ₹{income}</h3>
                <h3>Number of Transactions : {numberOfTransactions.length}</h3>
                <h3>Expense : ₹{expense}</h3>
            </div>
            <AddTransaction/>
            <TransactionTable />
        </div>
    )
}
