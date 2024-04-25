import React, { useState } from 'react'
import './CSS/Product.css'
import SearchBar from '../Components/SearchBar/SearchBar.jsx'
import ProductView from '../Components/ProductView/ProductView.jsx'
import FilterView from '../Components/Filter/Filter.jsx'
import all_product from '../Components/Assets/all_product.js'

const Product = () => {
  const [item, setItems] = useState(all_product);
  const menuItems = [... new Set(all_product.map((val) => val.category))];
  return (
    <div className='product-container'>
      <SearchBar/>
      <FilterView menuItems={menuItems}/>
      <ProductView/>
    </div>
  )
}

export default Product
