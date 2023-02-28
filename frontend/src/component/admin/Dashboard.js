import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Legend,
} from "chart.js";
import MetaData from "../layout/MetaData";
import { getAdminProduct } from "../../actions/ProductActions";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/UserActions";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  // console.log(products ? products.length : 0);
  let totalAmount = 0;
  orders && orders.forEach((item) => (totalAmount += item.totalPrice));
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Legend
  );
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "tomato",
        hoverBackgroundColor: ["rgb(197,72,40)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, products ? products.length : 0],
      },
    ],
  };
  return (
    <div className="dashboard">
      <MetaData title={`ADMIN Dashboard`} />
      <div className="dashboardContainerLeft">
        <Sidebar />
      </div>
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs. {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
