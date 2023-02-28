import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
export const ProductCard = ({ product }) => {
  const options = {
    value: product.rating,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">{`${product.numOfReviews} Reviews`}</span>
      </div>
      <span>{`Rs ${product.price}`}</span>
    </Link>
  );
};
