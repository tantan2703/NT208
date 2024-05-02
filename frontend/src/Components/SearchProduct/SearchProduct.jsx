import React, { useContext, useEffect } from 'react'
import '../../Pages/CSS/ShopCategory.css'
import { ShopContext } from '../../Context/ShopContext'
import dropdpwn_icon from '../Assets/dropdown_icon.png'
import Item from '../Item/Item'
import SearchBar from '../SearchBar/SearchBar'
import FilterView from '../Filter/Filter'
import { useState } from 'react'
import '../SearchBar/SearchBar.css'
import iconsearch from '../Assets/iconsearch.png'
import iconImageSearch from '../Assets/imageSearchIcon.png'

const HomePage = (props) => {
  const {all_product} = useContext(ShopContext);

  const [image, setImage] = useState(null);

const [viewProductIds, setViewProductIds] = useState([]);

  const imageHandler = async (e) => {
  let formData = new FormData();

  formData.append('query_img', e.target.files[0]);
  
   await fetch('http://localhost:5001/imagesearch', {
    method: 'POST',
    body: formData,
  }).then((response) =>response.json()).then((data) => setViewProductIds(data.scores));
}

useEffect(()=>{
    console.log(viewProductIds);
    },[viewProductIds]);

useEffect(()=>{
    setViewProductIds(all_product.map((val) => val.id));
    }, [all_product]);

  // const menuItems = [... new Set(all_product.map((val) => val.category))];
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      {/* <SearchBar/> */}
      <div className="search">
      <div className="searchInputs">
        <input
          type="text" placeholder='Search for watches'
        />
        <button className="search-button">
            <img src={iconsearch} alt="Search" />
        </button>
        <div className="image-search-button">
            <label htmlFor="file-input">
                <img src={iconImageSearch} alt="ImageSearch" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
      </div>
    </div>
      <div className="shopcategory-indexSort">
      {/* <FilterView menuItems={menuItems}/> */}
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        {/* <div className="shopcategory-sort">
        Sort by <img src={dropdpwn_icon} alt="" />
        </div> */}
      </div>
      <div className="shopcategory-products">
      {viewProductIds.map((id , i) => {
    const product = all_product.find(item => item.id == id);
    if (product) {
        return <Item key={i} id={product.id} name={product.name} image={product.image} price={product.price} />;
    } else {
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

export default HomePage
