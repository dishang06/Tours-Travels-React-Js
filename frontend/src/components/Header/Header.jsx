import React, { useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";
import "./../Header/Header.css";
import logo from "../../assets/images/TA_RED.png";
import { AuthContext } from "../../context/AuthContext";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/query",
    display: "Any Query ?",
  },
  // {
  //   path: "/payment",
  //   display: "payment",
  // },
];
const nav__links2 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/query",
    display: "Any Query ?",
  },
  {
    path: "/admin",
    display: "Admin",
  },
];

const MainHeader = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate("/");
  }, []);

  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* logo */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            {/* Menu */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {user && user.email === "admin@gmail.com"
                  ? nav__links2.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "active__link" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ))
                  : nav__links.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "active__link" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ))}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default MainHeader;
