import React from "react";
import "./Popular.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import watch2 from "../Assets/homepagewatch2.jpg";
import watch3 from "../Assets/homepagewatch3.jpg";
import watch4 from "../Assets/homepagewatch4.jpg";
import watch5 from "../Assets/homepagewatch5.jpg";

const Popular = () => {
  const setting = {
    dots: false,
    infinity: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1600,
  };
  return (
    <div className="page2 container-fluid bg-black">
      <div className="row">
        <div className="col-6">
          <p
            className="page2_context1 h2 text-light"
            style={{
              marginTop: "40%",
              marginLeft: "15%",
            }}
          >
            New products in 2024
          </p>
        </div>
        <div className="col-5">
          <Slider className="slider" {...setting}>
            <div className="image">
              <img className="img-clock" src={watch2} alt="clock" />
            </div>
            <div className="image">
              <img className="img-clock" src={watch3} alt="clock" />
            </div>
            <div className="image">
              <img className="img-clock" src={watch4} alt="clock" />
            </div>
            <div className="image">
              <img className="img-clock" src={watch5} alt="clock" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Popular;
