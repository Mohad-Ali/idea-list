import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../store/authSlice'
import toast from "react-hot-toast";

const SignUpPage = () => {

  const { searchParams } = new URL(document.location)
  const emailValue = searchParams.get("email")

  const [email, setEmail] = useState(emailValue || "")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleSignup = (e) => {
    e.preventDefault()
    dispatch(signup({ email, username, password }))
     toast.success("Signup successfully ✅"); 
  }

  return (
    <div className='w-full h-screen bg-black'>

      <div className='flex items-center justify-center pt-40'>
        <div className='w-full max-w-md p-8 space-y-6 bg-white/10 rounded-lg shadow-md'>
          
          <h1 className=' text-2xl text-white text-center font-bold mb-6'>
            Signup
          </h1>

          <form className='space-y-4' onSubmit={handleSignup}>

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
                Username
              </label>
              <input
                type="text"
                placeholder='mohammed'
                className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              Signup
            </button>
          </form>

          <div className='text-center text-gray-300'>
            Already a member?{" "}
            <Link to={"/login"} className='text-red-500 hover:underline'>
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpPage