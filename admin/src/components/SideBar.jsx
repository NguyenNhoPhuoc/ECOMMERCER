import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const SideBar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='inline hidden md:block'>Thêm sản phẩm</p>
                </NavLink>
                <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img className='w-5 h-5' src={assets.list_icon} alt="" />
                    <p className='inline hidden md:block'>Danh sách sản phẩm</p>
                </NavLink>
                <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='inline hidden md:block'>Quản lý đơn hàng</p>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar