import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TbUsers } from "react-icons/tb";
import { TbUserQuestion } from "react-icons/tb";
import { MdReviews } from "react-icons/md";
import { MdOutlineBook } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";

import "./admin.css";

const AdminLayout = () => {
  return (
    <>
     <Row>
        <Col lg="2" className="admin-sidebar">
      <header className="admin-sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to={"/admin/users"}>
                <TbUsers />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/querys"}>
                <TbUserQuestion />
                Querys
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/reviews"}>
                <MdReviews />
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/bookings"}>
                <MdOutlineBook />
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/tours"}>
                <FaHome />
                Tours
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/tickets"}>
                <FaHome />
                Tickets of Bus
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      </Col>
        <Col lg="10" className="admin-content">
          <Outlet /> {/* Renders the nested route component */}
        </Col>
      </Row>
    </>
  );
};
export default AdminLayout;
