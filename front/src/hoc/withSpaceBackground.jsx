import React from "react";
import "../styles/spaceBackground.scss";

const withSpaceBackground = (WrappedComponent) => {
  return () => {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <WrappedComponent />
      </>
    );
  };
};
export default withSpaceBackground;
