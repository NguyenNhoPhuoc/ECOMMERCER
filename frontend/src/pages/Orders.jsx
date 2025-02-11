import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
    const {backendURL,token,currency} = useContext(ShopContext)
    const [orderData,setOrderData] = useState([])
    const fetchOrderData = async ()=> {
        try {
            if(!token){
                return null
            }
            const response = await axios.post(backendURL+'/api/order/userorders',{},{headers:{token}})
            if(response.data.success){
                let allOrderItems = []
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status']=order.status
                        item['payment']=order.payment
                        item['paymentMethod']=order.paymentMethod
                        item['date']=order.date
                        allOrderItems.push(item)
                    })
                })
                console.log(allOrderItems);
                
                setOrderData(allOrderItems.reverse())
            } else {
                console.log(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

        useEffect(()=> {
            fetchOrderData()
        },[token])
    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'ĐƠN HÀNG'} text2={'CỦA TÔI'}/>
            </div>

            <div>
                {
                    orderData.map((item,index)=>(
                        <div key={index} className='py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                                <div>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex gap-3 mt-2 items-center text-base text-gray-700'>
                                        <p className='text-lg text-red-600 border-r pr-2 '>{currency}{item.price.toLocaleString('vi-VN')}</p>
                                        <p className='border-r pr-2 '>Số lượng:{item.quantity}</p>
                                        <p>Size:{item.size}</p>
                                    </div>
                                    <p className='mt-2'>Ngày đặt: <span className='text-gray-400'>{item.date}</span></p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>Đã giao hàng</p>
                                </div>
                                <button className=' hover:shadow-xl hover:bg-green-900 text-base py-2 px-4 border bg-green-700 text-white rounded-3xl font-sans'>Theo dõi đơn hàng</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders