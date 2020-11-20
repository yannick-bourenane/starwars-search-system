import React from "react";
import "../styles/footer.css";
const Footer = (props) => {
  const date = new Date();
  const year = date.getFullYear();
  return <footer className="bottom">© Empire {year}</footer>;
};

export default Footer;
