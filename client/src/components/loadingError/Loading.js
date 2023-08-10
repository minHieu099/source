import React from "react";
import "./loaderr.css";
const Loading = ({ width, height }) => {
  const loaderStyle = {
    width: width || "50px",
    height: height || "50px",
  };

  return (
    <div className="state-wrapped">
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
};

export default Loading;
