import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import ChatPage from '../../Components/ChatPage/ChatPage'
import {BrowserRouter} from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
        <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/listproduct' element={<ListProduct/>} />
          <Route path='/chatpage' element={<ChatPage/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}
export default Admin