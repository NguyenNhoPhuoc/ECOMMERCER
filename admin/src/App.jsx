import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

export const currency = '₫';
export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  useEffect(()=> {
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className='bg-white-100 min-h-screen'>
        <ToastContainer/>
        {token === "" 
        ? <Login setToken={setToken}/>
        :<>
          <Navbar/>
          <hr />
          <div className='flex w-full'>
            <SideBar/>
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token}/>}/>
                <Route path='/list' element={<List token={token}/>}/>
                <Route path='/orders' element={<Orders token={token}/>}/>
              </Routes>
            </div>
          </div>
      </>
      }
    </div>
    
  )
}

export default App