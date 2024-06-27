import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTransaction } from "../redux/transactionSlice"
import { changeIncome, changeNumberOfTransactions } from "../redux/userSlice"
import Swal from "sweetalert2"
import { v4 as uuidv4 } from 'uuid';

export default function useTransactionForm() {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transaction.transactions)
    const income = useSelector(state => state.user.income)

    const [transactionName, setTransactionName] = useState('')
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState('')
    const [primaryCategory, setPrimaryCategory] = useState('')
    const [isTransactionAdded, setIsTransactionAdded] = useState(false)
    const addTransactionHandler = () => {
        const transactiondata = { transactionid: uuidv4(), name: transactionName, amount: amount, category: primaryCategory != "Others" ? primaryCategory : category, createdAt: new Date().toUTCString() }
        if (transactiondata.amount <= income || transactiondata.category == "Salary") {
            if (transactiondata.name.length > 0 && (transactiondata.category.length > 0 || transactiondata.category == "Others") && transactiondata.amount > 0) {
                setTransactionName("")
                setAmount(0)
                setCategory("")
                setPrimaryCategory("")
                dispatch(addTransaction(transactiondata))
                if (transactiondata.category == "Salary") {
                    dispatch(changeIncome(transactiondata.amount))
                    localStorage.setItem("income", income + transactiondata.amount)
                } else {
                    dispatch(changeIncome(- transactiondata.amount))
                    localStorage.setItem("income", income - transactiondata.amount)
                }
                dispatch(changeNumberOfTransactions(1))
                setIsTransactionAdded(true)
                localStorage.setItem("numberOfTransactions", transactions.length)
                localStorage.setItem("transactions", JSON.stringify([...transactions, transactiondata]))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Insufficient Balance',
            })
        }
    }
    return { transactionName, setTransactionName, amount, setAmount, category, setCategory, primaryCategory, setPrimaryCategory, isTransactionAdded, setIsTransactionAdded, addTransactionHandler }
}