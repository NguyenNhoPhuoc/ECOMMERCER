import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([])

    useEffect(()=> {
        const bestProduct = products.filter((item)=> (item.bestseller))
        setBestSeller(bestProduct.slice(0,5));
    },[])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'SẢN PHẨM'} text2={'BÁN CHẠY'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Với thiết kế tối giản nhưng vô cùng tinh tế, những Casual Items không chỉ mang lại sự thoải mái tối ưu mà còn thể hiện sự thanh lịch và phong cách
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item,index)=> {
                    return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                })}
            </div>
        </div>
    )
}

export default BestSellers