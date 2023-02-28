import React from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { logout } from "../../../actions/UserActions";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const actions = [
    { icon: <PersonOutlineIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: order },
    { icon: <ShoppingCartOutlinedIcon />, name: "cart", func: cart },
    { icon: <LogoutIcon />, name: "Logout", func: logoutuser },
  ];
  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardCustomizeOutlinedIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function cart() {
    navigate("/cart");
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function order() {
    navigate("/order/me");
  }
  function account() {
    navigate("/account");
  }
  function logoutuser() {
    dispatch(logout());
    alert.success("Logged Out Successfully");
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      className="box"
      // sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
    >
      <Backdrop open={open} />
      <SpeedDial
        className="iconS"
        ariaLabel="SpeedDial tooltip example"
        // sx={{ position: "absolute" }}
        icon={<img className="image-tag" src={user.avatar.url} alt="none" />}
        onClose={handleClose}
        onOpen={handleOpen}
        direction="down"
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default UserOptions;
