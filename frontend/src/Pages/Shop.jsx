import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import SlideShow from '../Components/SlideShow/SlideShow'
import './CSS/Shop.css'

const Shop = () => {
  return (
    <div style={{background:"black"}} >
      <Hero/>
      <div className='slideshow'><SlideShow/></div>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
