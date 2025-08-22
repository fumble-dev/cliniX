import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  const onSuubmitHandler = async (e) => {
    e.preventDefault()

  }

  return (
    <form onSubmit={onSuubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-2xl'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className=''>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment. </p>
        {
          state === 'Sign Up' &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className=' border border-zinc-300 rounded-lg w-full p-2 mt-1' type="text" placeholder='Enter your name.' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className=' border border-zinc-300 rounded-lg w-full p-2 mt-1' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email.' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className=' border border-zinc-300 rounded-lg w-full p-2 mt-1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password.' required />
        </div>
        <button className='bg-black text-white w-full py-2 rounded-md text-base cursor-pointer hover:scale-105 transition-all duration-400'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up' ?
            <p>Already have an account? <span onClick={() => setState('Login')} className='text-blue-500 underline cursor-pointer'>Login Here</span></p> :
            <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-blue-500 underline cursor-pointer'>Click Here</span></p>
        }
      </div>

    </form>
  )
}

export default Login
