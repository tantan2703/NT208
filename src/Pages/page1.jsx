import React from "react";
import "./Css/page1.css";

const Page1 = () => {
  return (
    <div className="page1 container-fluid bg-black">
      <div className="row h-100">
        <div className="col-6">
          <p className="button1 btn btn-outline-primary rounded-4 text-dark">
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
            <img
              src="https://s3-alpha-sig.figma.com/img/4cdc/b0a1/43e44d3f363b950b96457a2e222a5249?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mNxhMPypcq-cNp2LOR8uqGbKa5v4pmxQEZ7qnzChlPzYPkfYt0WRfSYQm2oRw-gZLCrmElokjiMCp3Z902wyRw6WY3IAOciF9O33jE04hat79OJoLG8DdJNKcDmKBznMkpgNDuFtt4G2RlqCn4oLns9QSV1Nu62JWtJYjDr~xJCcRsCj2FWmKkVEoHhstmjWGtD39vWuta9SLSN8QkV0m1GOYtIRfaNGo1aorq1f3pjJDIeWYKYQ9uNwiF71lodr60zAo-OrcEnOxp9Oh4dPru4rnEOv9pVH6q~uSTxNC-OfUF5bxQlhT2IEZURfUisjeH4szDlmNR3-LUOQd9sfXg__"
              alt="clock"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
