import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const Orders = ({token}) => {
    const [orders,setOrders] = useState([])
    const fetchAllOrders = async ()=>{
        try {
            if(!token) return null
            const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
            console.log(response.data);
            
            if(response.data.success){
                setOrders(response.data.orders)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        fetchAllOrders()
    },[token])
    return (
        <div>
            <p className='mb-2'>TRANG ĐẶT HÀNG</p>
            <div>
                {
                    orders.map((order,index)=>(
                        <div key={index}>
                            <img src={assets} alt="" />
                            {
                                order.items.map((item,index)=>{
                                        return <p key={index}>{item.name}</p>
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders