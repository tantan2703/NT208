import React from 'react'
import './AdminSidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../Assets/Product_Cart.svg'
import list_product_icon from '../Assets/Product_list_icon.svg'
import chat_icon from '../Assets/chat_icon.png'

const AdminSidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} >
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} >
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
        <Link to={'/adminchatpage'} >
            <div className="sidebar-item">
                <img src={chat_icon} className='chat-icon' alt="" />
                <p>Chat Page</p>
            </div>
        </Link>
    </div>
  )
}

export default AdminSidebar