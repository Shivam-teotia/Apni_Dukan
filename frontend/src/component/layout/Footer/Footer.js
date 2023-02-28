import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h1>Apni Dukan</h1>
        <p>Ensuring the best welfare of the buyers</p>
        <p>Copyrights 2022 &copy; Shivam Teotia</p>
      </div>
      <div className="midFooter">
        <h4>Contact Us</h4>
        <span>shivamteotia200@gmail.com</span>
        <span>+91-9878437878</span>
      </div>
      <div className="rightFooter">
        <h4>Follow US</h4>
        <a href="https://www.linkedin.com/in/shivam-teotia/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
