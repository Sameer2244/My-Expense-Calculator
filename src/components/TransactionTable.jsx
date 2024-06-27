import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { addBunchOfTransactions, addTransaction, deleteTransaction } from '../redux/transactionSlice';
import { Button } from '@mui/material';
import { changeIncome, changeNumberOfTransactions } from '../redux/userSlice';
import { DataGrid } from '@mui/x-data-grid';



//styling for table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TransactionTable() {
    const dispatch = useDispatch()

    // getting user data
    const income = useSelector(state => state.user.income)

    // getting transaction data
    const transactions = useSelector(state => state.transaction.transactions)

    //getting all existing transactions
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("transactions")) == null) {
            dispatch(addBunchOfTransactions([]))
        } else {
            dispatch(addBunchOfTransactions(JSON.parse(localStorage.getItem("transactions"))))
        }

        if (JSON.parse(localStorage.getItem("income")) == null) {
            dispatch(changeIncome(5000))
        } else {
            dispatch(changeIncome(JSON.parse(localStorage.getItem("income"))))
        }
    }, [])

    //deleting transaction using id, amount and category
    const deleteTransactionHandler = (id, amount, category) => {
        dispatch(changeNumberOfTransactions(-1))
        dispatch(deleteTransaction(id))
        if (category == "Salary") {
            dispatch(changeIncome(-amount))
            localStorage.setItem("income", income - amount)
        } else {
            dispatch(changeIncome(amount))
            localStorage.setItem("income", income + amount)
        }
        localStorage.setItem("numberOfTransactions", transactions.length)
        localStorage.setItem("transactions", JSON.stringify(transactions.filter(transaction => transaction.transactionid !== id)))
    }


    const columns = [
        { field: 'id', headerName: 'Transaction ID', width: 300 },
        { field: 'name', headerName: 'Transaction Name', width: 300 },
        { field: 'amount', type: 'number', headerName: 'Amount', width: 100 },
        {
            field: 'category',
            headerName: 'Category',
            width: 300,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 300,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 300,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => deleteTransactionHandler(params.row.transactionid, params.row.amount, params.row.category)}>Delete</Button>
            ),
        },
    ];
    return (
        // <TableContainer component={Paper}>
        //     <h2>Transactions Record</h2>
        //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
        //         <TableHead>
        //             <TableRow>
        //                 <StyledTableCell>Transaction ID</StyledTableCell>
        //                 <StyledTableCell align="right">Name</StyledTableCell>
        //                 <StyledTableCell align="right">Amount</StyledTableCell>
        //                 <StyledTableCell align="right">Category</StyledTableCell>
        //                 <StyledTableCell align="right">Created At (date)</StyledTableCell>
        //                 <StyledTableCell align="right">Delete Transaction</StyledTableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {transactions.map((row) => (
        //                 <StyledTableRow key={row.transactionid}>
        //                     <StyledTableCell component="th" scope="row">
        //                         {row.transactionid}
        //                     </StyledTableCell>
        //                     <StyledTableCell align="right">{row.name}</StyledTableCell>
        //                     <StyledTableCell align="right">{row.amount}</StyledTableCell>
        //                     <StyledTableCell align="right">{row.category}</StyledTableCell>
        //                     <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
        //                     <StyledTableCell align="right" >
        //                         <Button
        //                             variant="contained"
        //                             color="error"
        //                             onClick={() => deleteTransactionHandler(row.transactionid, row.amount, row.category)}>
        //                             Delete
        //                         </Button></StyledTableCell>
        //                 </StyledTableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        //     {transactions.length == 0 && <p style={{ textAlign: "center" }}>No transactions added yet</p>}
        // </TableContainer>

        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={transactions}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
