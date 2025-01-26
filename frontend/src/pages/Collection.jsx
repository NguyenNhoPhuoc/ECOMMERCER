import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
    const {products,search, showSearch} = useContext(ShopContext);
    const [showFilter,setShowFilter] = useState(false);
    const [filterProduct,setFilterProducts] =useState([]);
    const [category,setCategory]  = useState([])
    const [subCategory,setSubCategory] =useState([])
    const [sortType,setSortType] = useState('default')

    
    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(item => item !=e.target.value))
        }
        else {
            setCategory(prev=>[...prev,e.target.value])
        }
    }
    const tonggleSubCategory = (e)=>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=>prev.filter(item => item !=e.target.value))
        }
        else {
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }
    

    const applyFilter = () =>{
        let productsCopy = products.slice();
        
        if(showSearch && search) {
            const removeVneseTones = (str) => {
                return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .toLowerCase();
            }
            const normalizedSearch = removeVneseTones(search.trim());
            productsCopy = productsCopy.filter(item=>removeVneseTones(item.name).includes(normalizedSearch))
        }

        if(category.length > 0) {
            productsCopy = productsCopy.filter(item=>category.includes(item.category))
        }

        if(subCategory.length>0) {
            productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
        }
        
        setFilterProducts(productsCopy)
    }


    const sortProduct = ()=>{
        let fpcopy = filterProduct.slice();
        switch(sortType){
            case 'low-high':
                setFilterProducts(fpcopy.sort((a,b)=>(a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpcopy.sort((a,b)=>(b.price - a.price)));
                break;

            default:
                applyFilter()
        }
    }
    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search,showSearch])

    useEffect(()=>{
        sortProduct()
    },[sortType])
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>
                <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>LỌC SẢN PHẨM
                <img onClick={()=>setShowFilter(!showFilter)} src={assets.dropdown_icon} alt='' className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>
                </p>

                {/* Category */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>DANH MỤC</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/> Nam
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/> Nữ
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/> Trẻ em
                        </p>
                    </div>
                </div>
                {/* Type */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>THỂ LOẠI</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Topwear'} onChange={tonggleSubCategory}/> Áo thun
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={tonggleSubCategory}/> Quần
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Winterwear'} onChange={tonggleSubCategory}/> Áo khoác
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'TẤT CẢ'} text2={'BỘ SƯU TẬP'}/>
                    {/* Product sort */}
                    <div className='flex text-base justify-center items-center gap-1'> 
                        <p>Sắp xếp theo: </p>
                        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 py-2 '> 
                            <option value="default">Mặc định</option>
                            <option value="low-high">Giá thấp đến cao</option>
                            <option value="high-low">Giá cao đến thấp</option>
                        </select>
                    </div>
                    
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {filterProduct.map((item,index)=> {
                            return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                        })}
                    </div>
            </div>
        </div>
    )
}

export default Collection



