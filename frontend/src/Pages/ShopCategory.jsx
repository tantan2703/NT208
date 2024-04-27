import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdpwn_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import SearchBar from '../Components/SearchBar/SearchBar'
import FilterView from '../Components/Filter/Filter'
import { useState } from 'react'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  const [item, setItems] = useState(all_product);
  const menuItems = [... new Set(all_product.map((val) => val.category))];
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <SearchBar/>
      <div className="shopcategory-indexSort">
      <FilterView menuItems={menuItems}/>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
        Sort by <img src={dropdpwn_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if (props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
