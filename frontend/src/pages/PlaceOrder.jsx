import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
const PlaceOrder = () => {
    const [method,setMethod] = useState('cod')
    const {navigate,backendURL,token,cartItem,setCartItem,getCartAmount,products,delivery_fee} =useContext(ShopContext) 
    const [formdata, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        state: '',
        specific_address: ''
    })
    
    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault()
        try {
            let orderItems = []
        for(const items in cartItem){
            for(const item in cartItem[items]){
                if(cartItem[items][item] > 0){
                    const itemInfor = products.find((products=>products._id === items))
                    if(itemInfor){
                        itemInfor.size = item
                        itemInfor.quantity = cartItem[items][item]
                        orderItems.push(itemInfor)
                    }
                }
            }
        }
        let orderData = {
            address:formdata,
            items:orderItems,
            amount:getCartAmount() + delivery_fee
        }
        
        switch(method){
            case 'cod':
                const response = await axios.post(backendURL+'/api/order/place',orderData,{headers:{token}})
                console.log(response.data);
                
                if(response.data.success){
                    setCartItem({})
                    navigate('/orders')
                } else {
                    toast.error(response.data.message)
                }
                break;

            default:
                break;
        }

        } catch (error) {
            console.log(error)
        }
    }

    const options = [
        { value: "danang", label: "Đà Nẵng" },
        { value: "hanoi", label: "Hà Nội" },
        { value: "hochiminh", label: "Hồ Chí Minh" },
        { value: "cantho", label: "Cần Thơ" },
        { value: "haiphong", label: "Hải Phòng" },
        { value: "angiang", label: "An Giang" },
        { value: "bacgiang", label: "Bắc Giang" },
        { value: "backan", label: "Bắc Kạn" },
        { value: "baclieu", label: "Bạc Liêu" },
        { value: "bacninh", label: "Bắc Ninh" },
        { value: "bariavungtau", label: "Bà Rịa - Vũng Tàu" },
        { value: "bentre", label: "Bến Tre" },
        { value: "binhdinh", label: "Bình Định" },
        { value: "binhduong", label: "Bình Dương" },
        { value: "binhphuoc", label: "Bình Phước" },
        { value: "binhthuan", label: "Bình Thuận" },
        { value: "camau", label: "Cà Mau" },
        { value: "caobang", label: "Cao Bằng" },
        { value: "dienbien", label: "Điện Biên" },
        { value: "dongnai", label: "Đồng Nai" },
        { value: "dongthap", label: "Đồng Tháp" },
        { value: "gialai", label: "Gia Lai" },
        { value: "hagiang", label: "Hà Giang" },
        { value: "langson", label: "Lạng Sơn" },
        { value: "quangnam", label: "Quảng Nam" },
        { value: "quangtri", label: "Quảng Trị" },
        { value: "soctrang", label: "Sóc Trăng" },
        { value: "sonla", label: "Sơn La" },
        { value: "thainguyen", label: "Thái Nguyên" },
        { value: "thanhhoa", label: "Thanh Hóa" },
    ];
    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* left site */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'THÔNG TIN'} text2={'GIAO HÀNG'}/>
                </div>
                <input required onChange={handleChange} name='name' value={formdata.name} className='py-1.5 border border-gray-300 rounded px-3.5 outline-none' type="text" placeholder='Nhập họ và tên'/>
                <input required onChange={handleChange} name='phone' value={formdata.phone} className='py-1.5 border border-gray-300 rounded px-3.5 outline-none' type="tel" placeholder='Nhập số điện thoại'/>
                <input required onChange={handleChange} name='email' value={formdata.email}  className='py-1.5 border border-gray-300 rounded px-3.5 outline-none' type="email" placeholder='Nhập email'/>
                    <select name="city" value={formdata.city} onChange={handleChange} className='border py-1.5  border-gray-300 rounded px-3.5 outline-none' >
                        <option value="" >Chọn Tỉnh/Thành phố</option>
                        {options.map((option)=> (
                            <option className='text-black min-h-[200px]' key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <input required name='district' value={formdata.district} onChange={handleChange} className='py-1.5 border border-gray-300 rounded px-3.5 outline-none' type="text" placeholder='Nhập Quận/Huyện'/>
                    <input required name='ward' value={formdata.ward} onChange={handleChange} className='py-1.5 border border-gray-300 rounded px-3.5 outline-none' type="text" placeholder='Nhập Phường/Xã'/>
                    <input required name='specific_address' value={formdata.specific_address} onChange={handleChange} className='py-1.5 border border-gray-300 rounded px-3.5 outline-none' type="text" placeholder='Nhập địa chỉ cụ thể'/>
            </div>
            {/* right site */}
            <div className='mt-8 flex flex-col'>
                <div className='mt-8 min-w-80 border px-4 py-4 shadow-xl'>
                    <div className='text-xl sm:text-2xl'>
                        <Title text1={'PHƯƠNG THỨC'} text2={'THANH TOÁN'}/>
                        <hr />
                    </div>
                    <div onClick={()=>setMethod('atm')} className='flex text-base mt-5 gap-2 hover:cursor-pointer'>
                        <img className='w-5' src={method === 'atm' ? assets.cricle_tick : assets.cricle} alt="" />
                        <img className='w-5' src={assets.atm_card} alt="" />
                        <p className='font-sans'>ATM Card (Thẻ nội địa)</p> 
                    </div>
                    <div onClick={()=>setMethod('visa')} className='flex text-base mt-5 gap-2 hover:cursor-pointer'>
                        <img className='w-5' src={method === 'visa' ? assets.cricle_tick : assets.cricle}  alt="" />
                        <img className='w-5' src={assets.visa} alt="" />
                        <p className='font-sans'>Thẻ quốc tế (Visa, Master, JCB)</p> 
                    </div>
                    <div onClick={()=>setMethod('momo')} className='flex text-base mt-5 gap-2 hover:cursor-pointer'>
                        <img className='w-5' src={method === 'momo' ? assets.cricle_tick : assets.cricle}  alt="" />
                        <img className='w-5' src={assets.momo} alt="" />
                        <p className='font-sans'>Thanh toán qua MoMo</p> 
                    </div>
                    <div onClick={()=>setMethod('cod')} className='flex text-base mt-5 gap-2 hover:cursor-pointer'>
                        <img className='w-5' src={method === 'cod' ? assets.cricle_tick : assets.cricle}  alt="" />
                        <p className='font-sans'>Thanh toán khi nhận hàng</p> 
                    </div>
                </div>
                <div className='mt-8 min-w-80 border px-4 py-4 shadow-2xl'>
                    <CartTotal/>
                </div>
                <button type='submit' onClick={console.log(formdata)} className='active:scale-110 hover:cursor-pointer hover:bg-green-700 text-2xl text-white my-4 py-2 w-full bg-[#98a77c]'>Thanh toán</button>
            </div>
        </form>
    )
}

export default PlaceOrder