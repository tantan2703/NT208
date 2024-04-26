import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import user_icon from '../Assets/avatar.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  
  const [menu,setMenu] = useState("shop");
  
    return (
    <div className='navbar'>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("watches")}}><Link style={{ textDecoration: 'none'}} to='/'>Watches</Link>{menu==="watches"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("about")}}><Link style={{ textDecoration: 'none'}} to='/mens'>About us</Link>{menu==="about"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("contact")}}><Link style={{ textDecoration: 'none'}} to='/womens'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-login-cart">
        <Link to='/login'><img src={user_icon} alt="" className='user_icon'/></Link>
        <Link to='/cart'><img src={cart_icon} alt="" className='cart_icon'/></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar
