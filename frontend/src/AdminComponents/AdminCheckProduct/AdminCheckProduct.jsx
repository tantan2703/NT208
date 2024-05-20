import React, { useState } from "react";
import Product from "./Product.js";

const AdminCheckProduct = () => {
  const [allProducts, setAllProducts] = useState(Product);
  const handleConfirm = (id) => {
    const updatedProducts = allProducts.map((product) =>
      product.id === id ? { ...product, status: "confirmed" } : product
    );
    setAllProducts(updatedProducts);
  };

  const handleDelete = (id) => {
    const updatedProducts = allProducts.filter((product) => product.id !== id);
    setAllProducts(updatedProducts);
  };
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">PRICE</th>
            <th scope="col">STATUS</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product, index) => (
            <tr>
              <th scope="row" key={index}>
                {product.id}
              </th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.status}</td>
              <td>
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={() => handleConfirm(product.id)}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCheckProduct;
