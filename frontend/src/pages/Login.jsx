import React, { useState } from 'react';

const Login = () => {
    const [currentState,setCurrenState] = useState('Đăng Ký')
    const onSubmitHandler = async (event)=> {
        event.preventDefault();
    }
    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 border-t'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>
            {currentState === 'Đăng Nhập' ?'':<input type="text" className='w-full px-5 py-2 border rounded-3xl border-gray-800 focus:border-green-800 focus:outline-none focus:text-lg' placeholder='Nhập tên'/>}
            <input type="email" className='w-full px-5 py-2 border rounded-3xl border-gray-800 focus:border-green-800 focus:outline-none focus:text-lg' placeholder='Nhập Email'/>
            <input type="password" className='w-full px-5 py-2 border rounded-3xl border-gray-800 focus:border-green-800 focus:outline-none focus:text-lg' placeholder='Nhập mật khẩu'/>
            <div className='w-full flex justify-between text-sm mt-[-5px] gap-5 my-2'>
                <p className='cursor-pointer text-lg'>Quên mật khẩu ?</p>
                {
                    currentState === 'Đăng Nhập'
                    ? <p onClick={()=> setCurrenState('Đăng Ký')} className='text-lg text-green-900 font-serif cursor-pointer'>Tạo tài khoản</p>
                    :<p onClick={()=> setCurrenState('Đăng Nhập')}  className='text-lg text-green-900 font-serif cursor-pointer' >Đăng nhập tại đây !</p>
                }
            </div>
            <button className='bg-green-800 rounded-3xl text-white font-light px-10 py-2 mt-4'>{currentState === 'Đăng Nhập' ? 'Đăng Nhập' : 'Đăng Ký'}</button>
        </form>
    )
}

export default Login