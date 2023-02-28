import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="error">
      <h1>404 Error</h1>
      <h3>Page Not Found</h3>
      <div>
        <Link to="/">Go to Home Page</Link>
      </div>
    </div>
  );
};

export default NotFound;
