import React from 'react'
// import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

    const { setAToken, backendUrl } = useContext(AdminContext)

    const {setDToken } = useContext(DoctorContext)

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
                if (data.success) {
                    localStorage.setItem('atoken', data.token);
                    setAToken(data.token);
                    toast.success('Login Successful.');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
                if (data.success) {
                    localStorage.setItem('dtoken', data.token);
                    setDToken(data.token);
                    toast.success('Doctor Login Successful.');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto text-black'><span className='text-gray-500'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-black text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
                {
                    state === 'Admin' ?
                        <p className=''>Doctor Login? <span onClick={() => setState('Doctor')} className='cursor-pointer underline text-blue-500'>Click Here</span></p> :
                        <p>Admin Login? <span onClick={() => setState('Admin')} className='cursor-pointer underline text-blue-500'>Click Here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
