import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { logoutUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


function Appbar() {

    const dispatch = useDispatch()
    //logout code
    const handleLogout = () => {
        localStorage.setItem("isloggedin", "false")
        dispatch(logoutUser())
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* desktop appbar */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none', flexGrow: 1
                        }}
                    >
                        My Expense Calculator
                    </Typography>
                    {/* mobile appbar */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Finance Tracker
                    </Typography>

                    <Button variant="contained" color='warning' onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Appbar;