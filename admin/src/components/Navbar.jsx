import React from 'react'
import { assets } from '../assets/assets'
const Navbar = () => {
    const logOut = ()=> {
        localStorage.removeItem('token')
        window.location.replace('/')
    }
    return (
        <div className='flex justify-between mx-4 my-3 items-center'>
            <img className='w-44' src={assets.logo} alt="" />
            <button onClick={logOut} className='my-3 rounded-full px-6 py-2 bg-green-800 text-white shadow-xl'>Logout</button>
        </div>
    )
}

export default Navbar