import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import data from "../auth.json"
import Swal from 'sweetalert2'
import { loginUser } from '../redux/userSlice'
import { Box, Button, Container, Stack, TextField } from '@mui/material'
export default function LoginPage() {

    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = (e) => {
        e.preventDefault();
        if (username === data.username && password === data.password) {
            localStorage.setItem("isloggedin", "true")
            dispatch(loginUser())
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Credentials',
            })
        }
    }

    useEffect(() => {
        // checking login status for the first time
        if (localStorage.getItem("isloggedin") === "true") {
            dispatch(loginUser())
        }
    }, [])
    return (
        <div className='login-container'>
            <form className='login-form'>
                <Stack spacing={2} alignItems="center">
                    <h2>Login</h2>
                    <TextField label="Enter Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="Enter Password" type='password' variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" onClick={loginHandler}>Login</Button>
                </Stack>
            </form>
        </div>
    )
}
