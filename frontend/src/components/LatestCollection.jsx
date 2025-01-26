import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [latestProducts,setLatestProducts] = useState([])
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'BỘ SƯU TẬP'} text2={'MỚI NHẤT'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Thời trang đơn giản nhưng thời thượng kết hợp giữa thiết kế tối giản và sự tinh tế hiện đại, mang lại vẻ đẹp thanh lịch và dễ phối đồ. Phong cách này chú trọng vào đường nét gọn gàng và chi tiết tinh tế, phù hợp với nhiều dịp khác nhau.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item,index)=> {
                    return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                })}
            </div>

        </div>
    )
}

export default LatestCollection