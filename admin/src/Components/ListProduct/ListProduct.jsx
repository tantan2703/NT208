import React, {useState, useEffect} from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch('http://localhost:4000/allproducts').then((response) => response.json())
    .then((data) => {
      setAllProducts(data);
    });
  }

  useEffect(()=>{
    fetchProducts();
  }, [])

  const remove_product = async (product_id)=> {
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:product_id})
    })
    await fetchProducts();
  }

  return (
    <div className='list-product'>
        <h1>
          All Products List
        </h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
          <hr />
          {allProducts.map((product, index) => {
            console.log(product.image);
            return <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
          </div>
          })}
        </div>
    </div>
  )
}

export default ListProduct