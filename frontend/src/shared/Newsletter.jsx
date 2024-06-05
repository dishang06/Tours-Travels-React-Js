import React from "react";
import "./newsletter.css";
import Swal from "sweetalert2";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import { useNavigate } from "react-router-dom";

const Newsletter = () => {
  const navigate = useNavigate();
  const Subscribe = () => {
    const emailInput = document.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
      // If email is empty, show an error toast
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Fill your email",
      });
    } else {
      // If email is not empty, show success toast and navigate
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Subscribed",
      });
      navigate("/");
    }
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Enter Your email" required />
                <button className="btn newsletter__btn" onClick={Subscribe}>
                  Subscribe
                </button>
              </div>

              <p>
                Subscribe now to unlock a treasure trove of invaluable traveling
                insights, where every tip and recommendation is curated to
                elevate your journey from ordinary to extraordinary.
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
