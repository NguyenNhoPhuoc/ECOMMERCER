import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext)
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'TỔNG'} text2={'THANH TOÁN'}/>
            </div>

            <div className='flex flex-col gap-2 mt-2 text-base'>
                <div className='flex justify-between'>
                    <p>Tổng tiền hàng</p>
                    <p>{currency}{getCartAmount().toLocaleString('vi-VN')}</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p>Tổng tiền phí vận chuyển</p>
                    <p>{currency}{delivery_fee.toLocaleString('vi-VN')}</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p className='font-bold text-xl'>Tổng thanh toán</p>
                    <p>{currency}{getCartAmount() === 0 ? 0 : (getCartAmount()+delivery_fee).toLocaleString('vi-VN')}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal