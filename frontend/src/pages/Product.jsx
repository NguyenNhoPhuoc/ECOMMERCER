import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';
const Product = () => {
    const {productId} = useParams();
    const {products,currency,addToCart} = useContext(ShopContext);
    const [productData,setProductData] = useState(false);
    const [image,setImage] = useState('')
    const [size,setSize]=useState('')

    const fetchProductData = async () => {
        products.map((item)=>{
            if(item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null;
            }
            return null;
        })
    }
    
    useEffect(() => {
        fetchProductData()
        
    },[productId,products])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* product image */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productData.image.map((item,index) => {
                        return <img onClick={()=> setImage(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                        })}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} alt="" className='w-full h-auto'/>
                    </div>
                </div>
                {/* Product information */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                        <p>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium text-red-500'>{currency}{productData.price.toLocaleString('vi-VN')}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Chọn kích cỡ</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item,index)=> {
                                return <button onClick={()=> setSize(item)} className={`flex border py-2 px-4  bg-gray-100 cursor-pointer ${item === size ? 'border-red-700' :''}`} key={index}>{item}</button>
                            })}
                        </div>
                    </div>
                    <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>THÊM VÀO GIỎ HÀNG</button>
                    <hr className='mt-8 sm:w-4/5'/>
                    <div className='flex gap-6 my-4 '>
                        <div className='flex flex-col gap-2 bg-gray-200 mt-3 justify-center align-center'>
                            <div className='flex justify-center '><img src={assets.delivery_icon} alt="" className='w-12'/></div>
                            
                            <p className='text-gray-950 px-4 py-1 text-xl'>Chính sách vận chuyển</p>
                        </div>
                        <div className='flex flex-col gap-2 bg-gray-200 mt-3 justify-center align-center'>
                            <div className='flex justify-center '><img src={assets.change_icon} alt="" className='w-12'/></div>
                            
                            <p className='text-gray-950 px-4 py-1 text-xl'>Bảo hành & Đổi trả</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Description and Review */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>MÔ TẢ SẢN PHẨM</b>
                    <p className='border px-5 py-3 text-sm'>ĐÁNH GIÁ</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>- Tên sản phẩm: {productData.name}</p>
                        <p>- Độ tuổi: &gt; 15 tuổi</p>
                        <p>- Phù hợp: Mặc đi làm, đi học, đi chơi.</p>
                        <p>- Chất liệu: 100% cotton</p>
                        <p>- Xuất xứ: Tự thiết kế và sản xuất bởi PN Boutique tại Việt Nam </p>
                        <p>- Cam kết 100% chất lượng từ chất vải đến đường chỉ, phát hiện lỗi được hoàn trả miễn phí.</p>
                </div>
            </div>
            {/* Related Products */}

            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product