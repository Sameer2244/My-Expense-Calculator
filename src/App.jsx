import { useState } from 'react'
import './App.css'
import Appbar from './components/Appbar'
import { useSelector } from 'react-redux'
import LoginPage from './components/LoginPage'
import UserDashboard from './components/UserDashboard'
import './css/transaction.css'
import './css/userdashboard.css'
import './css/login.css'

function App() {
  // getting login status
  const isloggedin = useSelector(state => state.user.isloggedin)
  if (isloggedin) {
    return (
      <>
        <Appbar />
        <UserDashboard/>
      </>
    )
  } else {
    return <LoginPage />
  }
}

export default App
