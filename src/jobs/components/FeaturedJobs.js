import React from "react";

const FeaturedJobs = (props) => {
  return (
    <div className="container">
      <div className="left">
        <div className="school-logo">
          <img src={props.src} alt={props.title} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
