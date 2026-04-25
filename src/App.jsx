import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadUser } from './store/authSlice'

// import your pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {

  const dispatch = useDispatch()

  // get auth state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  // load user from localStorage on refresh
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Routes>

      {/* Protected Home Route */}
      <Route 
        path='/' 
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
      />

      {/* Login Route */}
      <Route 
        path='/login' 
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
      />

      {/* Signup Route */}
      <Route 
        path='/signup' 
        element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} 
      />

    </Routes>
  )
}

export default App