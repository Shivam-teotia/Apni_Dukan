import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import logo from "../../../images/apni-dukan-logo3.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { logout } from "../../../actions/UserActions";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const toggle = () => setIsOpen(!isOpen);
  const loginButton = () => {
    toggle();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(logout());
      navigate("/login");
      alert.success("Logout Successfully");
    }
  };
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="0" className="navbar">
        <NavbarBrand tag={Link} to="/">
          <img className="logo" src={logo} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/" onClick={toggle}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/products" onClick={toggle}>
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/contacts" onClick={toggle}>
                Contact
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/search" onClick={toggle}>
                <BsSearch style={{ color: "white" }} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/cart" onClick={toggle}>
                <ShoppingCartIcon style={{ color: "white" }} />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="me" navbar>
            <NavLink>
              <Button
                style={{ color: "white" }}
                color="secondary"
                onClick={loginButton}
                outline
              >
                {isAuthenticated ? "Logout" : "Login/Sign Up"}
              </Button>
            </NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
