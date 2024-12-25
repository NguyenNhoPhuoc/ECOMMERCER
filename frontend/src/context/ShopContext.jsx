import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₫';
    const delivery_fee = 15000;
    // toLocaleString('vi-VN')
    const [search,setSearch] =useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [cartItem,setCartItem]=useState({})
    const navigate = useNavigate();
    const [token,setToken] = useState('')
    const backendURL= "https://ecommerce-backend-r66i.onrender.com" || import.meta.env.VITE_BACKEND_URL 
    const addToCart = async (itemId,size) => {
        if(!size){
            toast("Vui lòng chọn kích cỡ")
            return
        }
        let cartData = structuredClone(cartItem)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
            cartData[itemId][size]+=1;
        } else {
            cartData[itemId][size] = 1;
        }
        } else {
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        setCartItem(cartData)
    }
    
    const getCartCount = () => {
        let totalCount =0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item] > 0){
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {
                    
                }}
            }
        return totalCount
    }

    const updateQuantity = async(itemId,size,quantity)=> {
        let cartData = structuredClone(cartItem)
        cartData[itemId][size] = quantity
        setCartItem(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find((products)=>products._id === items)
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalAmount += itemInfo.price * cartItem[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }
    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItem,addToCart,getCartCount,updateQuantity,getCartAmount,
        navigate,token,setToken,backendURL
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
