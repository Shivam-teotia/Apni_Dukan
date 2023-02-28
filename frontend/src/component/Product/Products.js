import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { ProductCard } from "../layout/Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import logo from "../../images/noProductimages.png";
const Products = () => {
  const categories = [
    "Laptop",
    "Footwear",
    "Shirts",
    "Hoddie",
    "Watch",
    "tv",
    "Iphone",
    "LED",
  ];
  const params = useParams();
  const dispatch = useDispatch();

  const alert = useAlert();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 200000]);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    loading,
    error,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.product);
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, alert, error]);
  let count = filteredProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products -- Apni Dukan" />
          <h2 className="productHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            {products && products.length === 0 ? (
              <h2 className="noProduct">
                <img src={logo} alt="" />
              </h2>
            ) : (
              <></>
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={200000}
            />
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
