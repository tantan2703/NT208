import React, { createContext, useState } from 'react'
import { useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    
    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState({"0": 0});

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
   
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: itemId in prev ? prev[itemId] + 1 : 1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((data)=>console.log("Product Added to Cart"));
        }
    }


    const removeFromCart = (itemId) =>{
        setCartItems((prev) => {
            if (prev[itemId] === 1) {
                const { [itemId]: omit, ...rest } = prev;
                return rest;
            } else {
              return { ...prev, [itemId]: prev[itemId] - 1 };
            }
          });
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((data)=>console.log("Product Removed from Cart"));
        } 
    }
   
    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id === item);
                totalAmout += itemInfo.price * cartItems[item];
            }
        }
        return totalAmout;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            totalItem += cartItems[item];
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart}
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider