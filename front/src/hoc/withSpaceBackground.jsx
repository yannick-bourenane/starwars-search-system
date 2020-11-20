import React from "react";
import "../styles/spaceBackground.scss";

const withSpaceBackground = (WrappedComponent) => {
  return () => {
    return (
      <>
        <div id="stars" className="stars"></div>
        <div id="stars2" className="stars"></div>
        <div id="stars3" className="stars"></div>
        <div id="death-star"></div>
        <WrappedComponent />
      </>
    );
  };
};
export default withSpaceBackground;
