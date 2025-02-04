import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({id,image,name,price}) => {
    const {currency} =useContext(ShopContext);
    return (
        <Link onClick={window.scrollTo(0,0)} className='cursor-pointer text-gray-700' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='h-[250px] w-full object-cover hover:scale-110 transition ease-in-out' src={image[0]} alt=''/>
            </div>
            <p className='pt-3 pb-1 text-lg'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price.toLocaleString('vi-VN')}</p>
        </Link>
    )
}

export default ProductItem