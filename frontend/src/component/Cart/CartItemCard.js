import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";
const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className="CartItemsCard">
      <img src={item.image} alt="sfs" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs ${item.price}`}</span>
        <p onClick={() => deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
