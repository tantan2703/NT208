import React from 'react'
import './Overview.css'

const Overview = () => {
  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'> Personal Information</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name: </label>
          <p>Sheev Palpatine</p>
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Your Phone: </label>
          <p>133713371337</p>
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Your Email: </label>
          <p>22528080@gm.uit.edu.vn</p>
        </div>

        
      </div>
    </div>
  )
}

  export default Overview