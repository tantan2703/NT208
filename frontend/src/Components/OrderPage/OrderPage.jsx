import React, {useState, useEffect, useContext} from 'react'
import './OrderPage.css'
import '../../Pages/CSS/AdminPage.css'
import { ShopContext } from '../../Context/ShopContext';
import { Button } from '@chatscope/chat-ui-kit-react';
import Modal from 'react-modal';

const OrderPage = () => {

    const customStyles = {
        content: {
          width: '50%', // Điều chỉnh chiều rộng của modal
          height: '50%', // Điều chỉnh chiều cao của modal
          top: '50%', // Dịch modal xuống dưới 50% của viewport
          left: '50%', // Dịch modal sang phải 50% của viewport
          transform: 'translate(-50%, -50%)', // Dịch modal để nó căn giữa
        },
      };

  const {orderList} = useContext(ShopContext);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const ViewOrder = async (products)=> {
    // View order products bằng popover
  }

  function ProductListModal({ orders, isOpen, onRequestClose }) {
    return (
      <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={onRequestClose}
        contentLabel="Product List Modal"
      >
        <h2>Product List</h2>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order._id}</li>
          ))}
        </ul>
        <button onClick={onRequestClose}>Close</button>
      </Modal>
    );
  }

  return (
    <div className='admin'>
      
    <div className='list-product'>
        <h1>
          All Products List
        </h1>
        <div className="listproduct-allproduct">
          <hr />
          {orderList.map((order, index) => {
            return <div key={index} className="listproduct-format-main listproduct-format">
            <p>{order._id}</p>
            <p>{order.fullname}</p>
            <p>{order.time}</p>
            <p>{order.status}</p>
            <p>{order.total}</p>
            <Button onClick={handleOpenModal}>View</Button>
          </div>
          })}
        </div>
    </div>
    <ProductListModal
        orders={orderList}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </div>
  )
}

export default OrderPage