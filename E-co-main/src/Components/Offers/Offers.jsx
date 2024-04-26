import React from "react";
import watch6 from "../Assets/homepagewatch6.png";

const Offers = () => {
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${watch6})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        height: "100vh",
      }}
    ></div>
  );
};

export default Offers;
