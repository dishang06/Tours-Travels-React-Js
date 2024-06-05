import React, { useRef, useState, useEffect, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "./../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const {
    data: tour,
    loading,
    error,
  } = useFetch(`http://localhost:4000/api/v1/tours/${id}`);

  const {
    photo,
    title,
    day,
    night,
    desc,
    price,
    reviews,
    city,
    distance,
    maxGroupSize,
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
  } = tour;

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    // alert(`${reviewText}, ${tourRating}`);

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      } else {
        const reviewObj = {
          username: user?.username,
          reviewText,
          rating: tourRating,
        };

        const res = await fetch(`http://localhost:4000/api/v1/review/${id}`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewObj),
        });

        const result = await res.json();
        if (!res.ok) {
          return alert(result.message);
        }
        alert(result.message);
        alert("review submitted");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const Options = { day: "numeric", month: "long", year: "numeric" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading . . .</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-item-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Record"
                        ) : (
                          <span>
                            Review({reviews && reviews.length} reviews)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i class="fa-solid fa-map-location-dot"></i>
                        {city}
                      </span>
                      <span>
                        <i class="fa-solid fa-money-bill-wave"></i>₹{price} /
                        per person
                      </span>
                      <span>
                        <i class="fa-solid fa-people-group"></i>
                        {maxGroupSize} People
                      </span>
                      <span>
                        <i class="fa-solid fa-hourglass-half"></i>
                        {day} Day | {night} Night
                      </span>
                    </div>
                    <h5>
                      <u>Description</u>
                    </h5>
                    <p className="days">
                      <b>{day1}</b>
                    </p>
                    <p className="days">
                      <b>{day2}</b>
                    </p>
                    <p className="days">
                      <b>{day3}</b>
                    </p>
                    <p className="days">
                      <b>{day4}</b>
                    </p>
                    <p className="days">
                      <b>{day5}</b>
                    </p>
                    <p className="days">
                      <b>{day6}</b>
                    </p>
                  </div>

                  {/*====================== tour review section ==================*/}
                  <div className="tour__reviews mt-4">
                    <h4>Review({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d0flex align-item-center gap=3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          <i class="fa-regular fa-star"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          <i class="fa-regular fa-star"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          <i class="fa-regular fa-star"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          <i class="fa-regular fa-star"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          <i class="fa-regular fa-star"></i>
                          {/* <h6>Note:-(Click on star to give rating)</h6> */}
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                        />
                        <button className="submit btn text-black" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__review">
                      {reviews?.map((reviews) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-item-center justify-content-between">
                              <div>
                                <h5>{reviews.username}</h5>
                                <p>
                                  {new Date(
                                    reviews.createdAt
                                  ).toLocaleDateString("en-US", Options)}
                                </p>
                              </div>
                              <span className="d-flex align-item-center">
                                {reviews.rating}
                                <i className="fa-solid fa-star"></i>
                              </span>
                            </div>
                            <h6>{reviews.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/*====================== tour review end ==================*/}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
