import "./ProductView.css";
import all_product from "../Assets/all_product";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import iconsearch from "../Assets/iconsearch.png";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProductView = () => {
  const { name } = useParams();
  const [searchName, setSearchName] = useState(name);
  const [products, setProducts] = useState([
    {
      name: "",
      category: "",
      new_price: "",
      imageUrl: "",
    },
  ]);

  const loadProducts = async () => {
    try {
      const productList = await axios.get("http://localhost:3001/api/products");
      setProducts(productList.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!searchName) {
        const result = await axios.get("http://localhost:3001/api/products");
        setProducts(result.data);
      }
      const result = await axios.get(
        "http://localhost:3001/api/product/" + searchName
      );
      setProducts(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search for watches"
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <button className="search-button">
            <img
              src={iconsearch}
              alt="Search"
              onClick={(e) => handleSubmit(e)}
            />
          </button>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-name">
              <p>{product.name}</p>
              <p>{product.category}</p>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.new_price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;
