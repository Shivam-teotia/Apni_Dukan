import React, { useEffect, useState } from "react";
import "./ProductList.css";
import "./productReviews.css";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import CircularProgress from "@mui/material/CircularProgress";

import Sidebar from "./Sidebar";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/ProductActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import StarIcon from "@mui/icons-material/Star";
import { DELETE_REVIEW_RESET } from "../../constants/ProductConstanta";
import { Box } from "@mui/system";
const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    error: deletedError,
    isDeleted,
    loading: deletedLoading,
  } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const deleteProductHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };
  const [productId, setProductId] = useState("");
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    console.log(productId);
    dispatch(getAllReviews(productId));
  };
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    getAllReviews(productId);
  }, [dispatch, alert, error, deletedError, productId, isDeleted, navigate]);
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      type: "text",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });
  return (
    <>
      <MetaData title={`All Reviews - ADMIN`} />
      <div className="dashboard">
        <div className="dashboardContainerLeft">
          <Sidebar />
        </div>
        <div className="productReviewsContaier">
          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className="productReviewsForHeading">All Reviews</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Enter ProductId Here"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {deletedLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "0.5vmax",
              }}
            >
              <CircularProgress size={90} />
            </Box>
          ) : (
            <></>
          )}
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
