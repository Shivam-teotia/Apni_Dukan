import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { ProductCard } from "./ProductCard";
import "./Home.css";
import MetaData from "../MetaData";
import { clearErrors, getProduct } from "../../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Loader/Loader";
import { useAlert } from "react-alert";
export const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Apni Dukan" />
          <div className="banner">
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product, i) => {
                return <ProductCard product={product} key={i} />;
              })}
          </div>
        </>
      )}
    </>
  );
};
