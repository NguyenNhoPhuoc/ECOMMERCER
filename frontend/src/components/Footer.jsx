import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='flex justify-items-center flex-col sm:grid grid-cols-[1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <p className='text-black font-medium text-2xl mb-2'>Về chúng tôi</p>
                <p className='text-gray-600 mt-2 '>Liên hệ</p>
                <p className='text-gray-600 mt-2 '>Hệ thống cửa hàng</p>
                <p className='text-gray-600 mt-2 '>Tuyển dụng</p>
            </div>
            <div>
                <p className='text-black font-medium text-2xl mb-2'>Trung tâm trợ giúp</p>
                <p className='text-gray-600 mt-2 '>Hướng dẫn mua hàng</p>
                <p className='text-gray-600 mt-2 '>Hướng dẫn chọn size</p>
            </div>
            <div>
                <p className='text-black font-medium text-2xl mb-2 '>Chính sách</p>
                <p className='text-gray-600 mt-2 '>Chính sách giao hàng</p>
                <p className='text-gray-600 mt-2 '>Chính sách trả hàng</p>
            </div>
            
        </div>
            <div>
                <hr />
                <p className='text-center py-5 text-sm'>Copyright 2024@ EugenePhuoc - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer