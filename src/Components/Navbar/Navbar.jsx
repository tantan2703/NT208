import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import user_icon from "../Assets/avatar.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("watches");
          }}
        >
          <div style={{ textDecoration: "none" }} to="/">
            Watches
          </div>
          {menu === "watches" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about");
          }}
        >
          <div style={{ textDecoration: "none" }} to="/mens">
            About us
          </div>
          {menu === "about" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
        >
          <div style={{ textDecoration: "none" }} to="/womens">
            Contact
          </div>
          {menu === "contact" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-login-cart">
        <div>
          <img src={user_icon} alt="" className="user_icon" />
        </div>
        <div>
          <img src={cart_icon} alt="" className="cart_icon" />
        </div>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
