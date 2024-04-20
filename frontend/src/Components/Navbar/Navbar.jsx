import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import chat_icon from '../Assets/chat_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/dropdown_icon.png'
import user_icon from '../Assets/avatar.png'

const Navbar = () => {
  
  const [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className='navbar'>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("watches")}}><Link style={{ textDecoration: 'none'}} to='/'>Watches</Link>{menu==="watches"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("about")}}><Link style={{ textDecoration: 'none'}} to='/mens'>About us</Link>{menu==="about"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("contact")}}><Link style={{ textDecoration: 'none'}} to='/womens'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-login-cart">
      {localStorage.getItem('auth-token')
        ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button> 
      :<Link to='/login'><button>Login</button></Link>}
        <Link><img src={user_icon} alt="" className='user_icon'/></Link>
        <Link to='/cart'><img src={cart_icon} alt="" className='cart_icon'/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        <Link to='/chatpage'><img className='chat-icon' src={chat_icon} alt="" /></Link>
      </div>
    </div>
  )
}

export default Navbar
