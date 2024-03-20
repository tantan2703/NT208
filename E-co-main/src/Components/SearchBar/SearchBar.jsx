import React, {useState} from 'react'
import './SearchBar.css'
import data_product from '../Assets/all_product'

function SearchBar({ placeholder, data }) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text" placeholder='Search for watches'
        />
        <button class="search-button">
            <img src="https://icons8.com/icon/3159/search" alt="Search" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar;
