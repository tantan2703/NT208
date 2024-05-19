import React, { useContext, useEffect } from "react";
import "../../Pages/CSS/ShopCategory.css";
import { ShopContext } from "../../Context/ShopContext";
import dropdpwn_icon from "../Assets/dropdown_icon.png";
import Item from "../Item/Item";
import SearchBar from "../SearchBar/SearchBar";
import FilterView from "../Filter/Filter";
import { useState } from "react";
import "../SearchBar/SearchBar.css";
import "./SearchProduct.css";
import iconsearch from "../Assets/iconsearch.png";
import iconImageSearch from "../Assets/imageSearchIcon.png";
import SingleBanner from "../Banners/Banner";
import banner_img from "../Assets/jeremy-budiman-unsplash.jpg";

const HomePage = (props) => {
  const [search, setSearch] = useState("");

  const { all_product } = useContext(ShopContext);

  const [image, setImage] = useState(null);

  const [viewProductIds, setViewProductIds] = useState([]);

  const [filterProducts, setFilterProducts] = useState([]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") {
      setFilterProducts(all_product);
    } else {
      setFilterProducts(
        all_product.filter((val) =>
          val.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  useEffect(() => {
    setViewProductIds(filterProducts.map((val) => val.id));
  }, [filterProducts]);

  const filterIncreasePrice = () => {
    const sortedProducts = [...filterProducts].sort(
      (a, b) => a.price - b.price
    );
    setViewProductIds(sortedProducts.map((product) => product.id));
  };

  const filterDecreasePrice = () => {
    const sortedProducts = [...filterProducts].sort(
      (a, b) => b.price - a.price
    ); //create copy all_product array
    setViewProductIds(sortedProducts.map((product) => product.id));
  };

  const imageHandler = async (e) => {
    let formData = new FormData();

    console.log(e.target.files[0]);

    formData.append("query_img", e.target.files[0]);

    await fetch("/imagesearch", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setViewProductIds(data.scores));
  };

  useEffect(() => {
    console.log(viewProductIds);
  }, [viewProductIds]);

  useEffect(() => {
    loadData();
  }, [all_product]);

  const loadData = () => {
    setViewProductIds(all_product.map((val) => val.id));
  };

  // const menuItems = [... new Set(all_product.map((val) => val.category))];
  return (
    <div className="shop-category">
      {/* <SingleBanner heading='Product' bannerimage={banner_img}/>  */}
      {/* <SearchBar/> */}
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search for watches"
            onChange={searchHandler}
          />
          <button className="search-button">
            <img src={iconsearch} alt="Search" />
          </button>
          <div className="image-search-button">
            <label htmlFor="file-input">
              <img src={iconImageSearch} alt="ImageSearch" />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
        </div>
      </div>
      <div className="filter_price">
        <div>
          <select
            onChange={(e) => {
              const selectedOption = e.target.value;
              if (selectedOption != null && selectedOption == "increase") {
                filterIncreasePrice();
              } else if (
                selectedOption != null &&
                selectedOption == "decrease"
              ) {
                filterDecreasePrice();
              } else {
                loadData();
              }
            }}
          >
            <option value>
              <p>Giá</p>
            </option>
            <option value="increase">
              <p>Giá tăng dần</p>
            </option>
            <option value="decrease">
              <p>Giá giảm dần</p>
            </option>
          </select>
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
        {viewProductIds.map((id, i) => {
          const product = all_product.find((item) => item.id == id);
          if (product) {
            return (
              <Item
                key={i}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default HomePage;
