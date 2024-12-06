import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'LIÊN HỆ'} text2={'CHÚNG TÔI hehehe'} />
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-1/2' src={assets.contact_img} alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600 '>Cửa hàng của chúng tôi</p>
                    <div className='flex gap-2'>
                        <img className='w-4 h-4 mt-1' src={assets.location} alt="" />
                        <p className='text-gray-500'>33 Nguyễn Văn Linh, Bình Hiên, Hải Châu, Đà Nẵng</p>
                    </div>
                    <div className='flex gap-2'>
                        <img className='w-4 h-4 mt-1' src={assets.phone} alt="" />
                        <p className='text-gray-500'>0845203713</p>
                    </div>
                    <div className='flex gap-2'>
                        <img className='w-4 h-4 mt-1' src={assets.clock} alt="" />
                        <p className='text-gray-500'>7:00 - 22:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact