import React, { useContext } from 'react'
import Item from '../Item/Item'
import './NewCollections.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {ShopContext} from '../../Context/ShopContext'


const NewCollections = () => {
  
  const {all_product} = useContext(ShopContext);

  // useEffect(()=>{
  //   fetch('/newcollections')
  //   .then((response)=>response.json())
  //   .then((data)=>setNew_collection(data));
  // },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {all_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections
