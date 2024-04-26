import React from "react";
import "./Hero.css";
import watch1 from "../Assets/homepagewatch1.png";

const Hero = () => {
  return (
    <div className="page1 container-fluid bg-black m-0">
      <div className="row h-100">
        <div className="col-6">
          <p className="button1 btn btn-light btn-outline-primary rounded-4 text-dark">
            Breaking news
          </p>
          <p className="page1_context1 h2 text-light">
            Tempor Consectetur Est Elit
          </p>
          <p className="page1_context2 text-light">
            Dec 24, 2022
            <span className="button2 btn btn-light text-dark rounded-4">
              5 mins read
            </span>
          </p>
        </div>
        <div className="col-6">
          <div className="img-container">
            <img src={watch1} alt="clock" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
