import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import toast from "react-hot-toast";

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogIn = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
     toast.success("Login successfully ✅"); 
  }

  return (
    <div className='w-full h-screen bg-black'>

      <div className='flex items-center pt-50 justify-center'>
        <div className='w-full max-w-md p-8 space-y-6 bg-white/10 rounded-lg shadow-md'>
          
          <h1 className=' text-2xl text-white text-center font-bold mb-6'>
            Log In
          </h1>

          <form className='space-y-4' onSubmit={handleLogIn}>
            
            <div>
              <label className='text-sm font-medium text-gray-400 block'>
                Email
              </label>
              <input
                type="email"
                placeholder='you@example.com'
                className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className='text-sm font-medium text-gray-400 block'>
                Password
              </label>
              <input
                type="password"
                placeholder='. . . . . .'
                className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className='w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700'>
              Login
            </button>
          </form>

          <div className='text-center text-gray-300'>
            Don't have an account?{" "}
            <Link to={"/signup"} className='text-red-500 hover:underline'>
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage