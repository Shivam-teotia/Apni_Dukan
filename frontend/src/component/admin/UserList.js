import React, { useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/UserActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { DELETE_USER_RESET } from "../../constants/UserConstants";
const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
    loading,
  } = useSelector((state) => state.profile);
  const deleteProductHandler = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, message, deleteError, isDeleted, navigate]);
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Name",
      type: "text",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/users/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
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
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <>
      <MetaData title={`All Users - ADMIN`} />
      <div className="dashboard">
        <div className="dashboardContainerLeft">
          <Sidebar />
        </div>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          {loading ? (
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
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
