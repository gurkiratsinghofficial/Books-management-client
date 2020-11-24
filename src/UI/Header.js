import { useEffect, useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { logOut } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getJwt } from "../helpers/jwt";
import { Link, useHistory, useLocation } from "react-router-dom";

function Header(props) {
  const [jwt, setJwt] = useState("");
  const history = useHistory();

  const location = useLocation();
  useEffect(() => {
    const jwt2 = getJwt();
    setJwt(jwt2);
  }, [location]);

  const dispatch = useDispatch();

  /**method for logging out */
  const logoutUser = async () => {
    try {
      /**dispatch action to add new book*/
      const resultAction = await dispatch(logOut());
      unwrapResult(resultAction);
      history.push("/");
    } catch (err) {
      console.log("unable to logout", err);
    }
  };
  return (
    <div>
      {/* If JWT is present header with logout will render */}
      {jwt ? (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>
            <Link to="/dashboard">Books Management App</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link
                style={{ color: "white", margin: "20px 20px 1px" }}
                to="/profile"
              >
                Profile
              </Link>
              <Link style={{ color: "white", margin: "20px" }} to="/addBook">
                Add Book
              </Link>
            </Nav>
            <Form inline>
              <Button variant="outline-success" onClick={() => logoutUser()}>
                LOGOUT
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        // if JWT is not present, normal header will render
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Books Management App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Link style={{ color: "white", margin: "1px 1px 1px 20px" }} to="/">
              Signup
            </Link>
            <Link
              style={{ color: "white", margin: "1px 1px 1px 20px" }}
              to="/login"
            >
              Login
            </Link>
            <Nav className="mr-auto"></Nav>
            <Form inline></Form>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
}

export default Header;
