import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({setToken}) => {
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const onSubmitHandler = async (e)=> {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen w-full'>
            <div className='bg-white shadow-md rounded-md px-8 py-6 max-w-md'>
                <h1 className='text-center text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Nhập Email' required/>
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Mật khẩu</p>
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Nhập Password' required/>
                    </div>
                    <button className='bg-green-800 text-white flex px-3 py-2 w-full rounded-full justify-center'>Đăng Nhập</button>
                </form>
            </div>
        </div>
    )
}

export default Login