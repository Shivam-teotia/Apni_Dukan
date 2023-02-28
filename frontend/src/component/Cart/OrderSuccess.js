import React from "react";
import "./OrderSuccess.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully</Typography>
      <Link to="/order/me">View Order</Link>
    </div>
  );
};

export default OrderSuccess;
