import React from "react";
import image from "../Components/Assets/background3.png";

const Page3 = () => {
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        height: "100vh",
        marginTop: "1rem",
      }}
    ></div>
  );
};

export default Page3;
