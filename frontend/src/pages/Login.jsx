import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
    const [currentState,setCurrenState] = useState('Đăng Ký')
    const {token,setToken,navigate,backendURL} = useContext(ShopContext)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (event)=> {
        event.preventDefault();
        try {
            if(currentState === 'Đăng Ký'){
                const response = await axios.post(backendURL+"/api/user/register",{email,password,name})
                if(response.data.success) {
                    setToken(response.data.token)
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
                
            } else {
                const response = await axios.post(backendURL+"/api/user/login",{email,password})
                if(response.data.success){
                    setToken(response.data.token)
                    toast.success(response.data.message)
                    localStorage.setItem('token',response.data.token)
                    navigate('/')
                } else {
                    toast.error(response.data.message)
                }
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 border-t'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>
            {currentState === 'Đăng Nhập' ?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-5 py-2 border rounded-3xl border-gray-800 focus:border-green-800 focus:outline-none focus:text-lg' placeholder='Nhập tên'  required/>}
            <input type="email" onChange={(e)=> setEmail(e.target.value)} value={email} className='w-full px-5 py-2 border rounded-3xl border-gray-800 focus:border-green-800 focus:outline-none focus:text-lg' placeholder='Nhập Email' required/>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} className='w-full px-5 py-2 border rounded-3xl border-gray-800 focus:border-green-800 focus:outline-none focus:text-lg' placeholder='Nhập mật khẩu' required/>
            <div className='w-full flex justify-between text-sm mt-[-5px] gap-5 my-2'>
                <p className='cursor-pointer text-lg'>Quên mật khẩu ?</p>
                {
                    currentState === 'Đăng Nhập'
                    ? <p onClick={()=> setCurrenState('Đăng Ký')} className='text-lg text-green-900 font-serif cursor-pointer'>Tạo tài khoản</p>
                    :<p onClick={()=> setCurrenState('Đăng Nhập')}  className='text-lg text-green-900 font-serif cursor-pointer' >Đăng nhập tại đây !</p>
                }
            </div>
            <button type='submit' className='bg-green-800 rounded-3xl text-white font-light px-10 py-2 mt-4'>{currentState === 'Đăng Nhập' ? 'Đăng Nhập' : 'Đăng Ký'}</button>
        </form>
    )
}

export default Login
