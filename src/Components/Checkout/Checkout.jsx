import React, { useContext } from 'react';
import './Checkout.css'
import { ShopContext } from '../../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import iconvisa from '../Assets/visa.png'
import iconpaypal from '../Assets/PayPal-Logo.jpg'

const Checkout = () => {  
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);
    return (
            <div className='Checkout_Container'>
                <div className="LeftSide">
                    <h2 className="YourCart_Text">Your Cart</h2>
                    <div className="CheckOutList">
                        {all_product.map((e) => {
                            if (cartItems[e.id] > 0) {
                                return <div>
                                    <div className="cartitems-format cartitems-format-main" id="productlist">
                                        <div className="leftsidelist">
                                            <img src={e.image} alt="" className='checkoutlist-product-icon'/>
                                        </div>
                                        <div className="rightsidelist">
                                            <p>{e.name}</p>
                                            <p>${e.new_price}</p>
                                            <button className='checkoutlist-quantity'>{cartItems[e.id]}</button>
                                            <p>{e.new_price * cartItems[e.id]}</p>
                                        </div>
                                    </div>
                                    </div>
                            }
                            return null;
                        })}
                    </div>
                </div>
                <div className="RightSide"> 
                    <div className="Infolabel">
                        <h2 className='LabelText'><u>Shipping</u></h2>
                        <div className='ShippingLocation'><p>Arrives Tue, Jul 20-Thu, Jul 22 </p><u>Edit Location</u></div>
                        <p className='Pickup'><strong>Pickup</strong></p>
                        <p className='FindStore'><strong>Find a Store</strong></p>
                    </div>
                    <div className="Infolabel">
                        <h2 className='LabelText'><u>Summary</u></h2>
                        <div className="TotalItemCheckOut">
                            <p>Total</p>
                            <p className='Total'><strong>${getTotalCartAmount()}</strong></p>
                        </div>
                    </div>
                    <div className="PaymentForm">
                        <div className="PaymentMethod">
                            <div className="Payment-Title">
                                <FontAwesomeIcon className='PaymentIcon' icon={faCreditCard} />
                                <p className='formLabelText'>Payment method</p>
                            </div>
                            <p className='descriptionText'>Ad enim veniam amet</p>
                            <form className='PaymentFormInput'>
                                <div className="PaymentOption">
                                    <div className="payment-method">
                                        <input type="radio" id="visa" name="payment-method" value="visa" />    
                                        <img className='Payment-img' src={iconvisa} alt="visa"></img>
                                    </div>
                                    <div className="payment-method">
                                        <input type="radio" id="paypal" name="payment-method" value="paypal"/>
                                        <img className='Payment-img' src={iconpaypal} alt="paypal"></img>
                                    </div>
                                </div>
                                <div className="PaymentOption">
                                    <div className="payment-input">
                                        <label for="NameOnCard"><strong>Name on card</strong></label><br/>
                                        <input type="text" className='inputForm descriptionText' id="nameCard" placeholder='Enter name on card'/>    
                                    </div>
                                    <div className="payment-input">
                                        <label for="CartNumber"><strong>Cart number</strong></label><br/>
                                        <input type="text" className='inputForm descriptionText' id="CartNumber" placeholder='Enter card number'/>    
                                    </div>
                                </div>
                                <div className="PaymentOption">
                                    <div className="payment-input">
                                        <label for="ExpirationDate"><strong>Expiration date</strong></label><br/>
                                        <select className='inputForm descriptionText' id="nameCard" placeholder='MM/YY' > 
                                            <option value="" disabled selected hidden>MM/YY</option>
                                        </select>
                                    </div>
                                    <div className="payment-input">
                                        <label for="CVV"><strong>CVV</strong></label><br/>
                                        <input type="text" className='inputForm descriptionText' id="CartNumber" placeholder='Enter CVV' required />    
                                    </div>
                                </div>
                                <div className="PaymentOption">
                                    <div className="payment-input descriptionText checkbox">
                                        <input type='checkbox' />
                                        <p className='checkboxtext'>Use same address as billing info</p>
                                    </div>
                                </div>
                                <div className="payment-input">
                                        <label for="Address"><strong>Address</strong></label><br/>
                                        <input type="text" className='inputForm descriptionText' id="Address" placeholder='Add Address'/>    
                                </div>
                                <div className="PaymentOption">
                                    <div className="payment-input">
                                        <label for="Code"><strong>Zip/Postal code</strong></label><br/>
                                        <input type="text" className='inputForm descriptionText' id="Code" placeholder='Input code' />    
                                    </div>
                                    <div className="payment-input">
                                        <label for="Country"><strong>Country/Region</strong></label><br/>
                                        <select className='inputForm descriptionText' id="nameCard" placeholder='MM/YY' > 
                                            <option value="" disabled selected hidden>Select country/region</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="PaymentOption">
                                    <div className="payment-input"></div>
                                    <div className="payment-input input-btn">
                                        <input type="submit" value="Save infomation" className="btn"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                   </div>
                </div>
            </div>
    );
}

export default Checkout;
