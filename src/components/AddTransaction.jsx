import { Accordion, AccordionSummary, Alert, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import useTransactionForm from '../customHook/useTransactionForm';
export default function AddTransaction() {

    //getting states and functions from custom hook
    const {
        transactionName, setTransactionName, amount, setAmount, category, setCategory, primaryCategory,
        setPrimaryCategory, isTransactionAdded, setIsTransactionAdded, addTransactionHandler
    } = useTransactionForm()

    //styles for mui elements
    const transactionFieldContainer = {
        display: 'flex',
        gap: 2,
        alignItems: 'start',
    }
    const transactionFormContainer = { display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center',padding:5  }

    // calculating window width
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    //timeout for transaction status alert
    useEffect(() => {
        setTimeout(() => {
            setIsTransactionAdded(false)
        }, 5000)
    }, [isTransactionAdded])


    return (
        <div className='transaction-form'>
            <Accordion>
                <AccordionSummary sx={{ backgroundColor: '#1976d2', color: 'white'}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Add New Transaction
                </AccordionSummary>

                {/* transaction form */}

                <AccordionDetails sx={transactionFormContainer}>
                    <Box sx={windowSize > 600 ? transactionFieldContainer : {...transactionFormContainer,padding:0}}>
                        <TextField label="Enter Transaction Name" variant="outlined" value={transactionName} onChange={(e) => setTransactionName(e.target.value)} />
                        <TextField label="Enter Amount" type='number' variant="outlined" value={amount} onChange={(e) => setAmount(e.target.value)} />

                    </Box>
                    <FormControl sx={windowSize > 600 ? { width: 450 } : { width: '75%' }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={primaryCategory}
                            label="category"
                            onChange={(e) => setPrimaryCategory(e.target.value)}
                        >
                            <MenuItem value={"Salary"}>Salary</MenuItem>
                            <MenuItem value={"Rent"}>Rent</MenuItem>
                            <MenuItem value={"Groceries"}>Groceries</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        primaryCategory === "Others" && <TextField sx={windowSize > 600 ? { width: 450 } : { width: '75%' }} label="Enter Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} />
                    }
                    <Button variant="contained" onClick={addTransactionHandler}>Add Transaction</Button>
                </AccordionDetails>

                {/* alert */}
                {isTransactionAdded && <Alert severity="success">
                    Transaction Added
                </Alert>}

                
            </Accordion>
        </div>
    )
}
