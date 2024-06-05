import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import { Container, Row, Col } from "reactstrap";
import TourCard from "./../shared/TourCard";
import useFetch from "../hooks/useFetch";
import Newsletter from "./../shared/Newsletter";
import SearchBar from "./../shared/SearchBar";

const Tours = () => {
  const toursPerPage = 12;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(
    `http://localhost:4000/api/v1/tours?page=${page}&limit=${toursPerPage}`
  );
  const { data: tourCount } = useFetch(
    `http://localhost:4000/api/v1/tours/search/getTourCount`
  );

  useEffect(() => {
    const pages = Math.ceil(tourCount / toursPerPage);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount]);
  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading . . .</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-item-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
