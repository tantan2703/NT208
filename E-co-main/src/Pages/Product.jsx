import React, { useState } from "react";
import "./CSS/Product.css";
import ProductView from "../Components/ProductView/ProductView.jsx";
import all_product from "../Components/Assets/all_product.js";

const Product = () => {
  const [item, setItems] = useState(all_product);
  const menuItems = [...new Set(all_product.map((val) => val.category))];
  return (
    <div className="product-container">
      <ProductView />
    </div>
  );
};

export default Product;
