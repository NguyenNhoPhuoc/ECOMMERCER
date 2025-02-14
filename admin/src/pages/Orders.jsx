import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import carton from '../assets/carton.png'

const Orders = ({token}) => {
    const [orders,setOrders] = useState([])
    const [status,setStatus] = useState('Order Placed')
    const fetchAllOrders = async ()=>{
        try {
            if(!token) return null
            const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
            if(response.data.success){
                setOrders(response.data.orders)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const handleChange = async (e,orderId) => {
        setStatus(e.target.value)
        try {
            const response = axios.post(backendUrl+'/api/order/status',{orderId,status},{headers:{token}})

                fetchAllOrders()
            
        } catch (error) {
            console.log(error);
        }
    } 
    useEffect(()=>{
        fetchAllOrders()
    },[token])
    return (
        <div>
            <p className='mb-2'>TRANG ĐẶT HÀNG</p>
            <div className='flex flex-col gap-6 '>
                {
                    orders.map((order,index)=>(

                        <div className='flex justify-between gap-6 border px-5 py-5' key={index}>
                            <img className='w-20' src={carton} alt="" />
                            <div>
                            {
                                order.items.map((item,index)=>{
                                        if(index === order.items.length-1){
                                            return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span className='font-bold'>{item.size}</span></p>
                                        } else {
                                            return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span className='font-bold'>{item.size}</span> ,</p>
                                        }
                                })
                            }
                            <p className='py-0.5 font-bold'>{order.address.name}</p>
                            <p className='py-0.5'>{order.address.specific_address}, {order.address.ward}, {order.address.district}, {order.address.city}</p>
                            <p className='py-0.5'>{order.address.phone}</p>
                            </div>
                            <div>
                                <p className='py-0.5'>Phương thức thanh toán: {order.paymentMethod}</p>
                                <p className='py-0.5'>Thanh toán:{order.payment ? "Đã thanh toán":"Chưa thanh toán"}</p>
                                <p className='py-0.5'>Ngày đặt hàng: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className='text-red-500'>{order.amount} {currency}</p>
                            </div>
                            <div>
                            <select onChange={(e)=>handleChange(e,order._id)} value={order.status} className="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="Đã đặt hàng">Đã đặt hàng</option>
                                    <option value="Đang đóng gói">Đang đóng gói</option>
                                    <option value="Đã vận chuyển">Đã vận chuyển</option>
                                    <option value="Đang giao hàng">Đang giao hàng</option>
                                    <option value="Đã giao">Đã giao</option>
                                </select>
                            </div>
                                
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders