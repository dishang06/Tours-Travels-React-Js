import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Buses } from "../../utils/BusData";
import "../BusBooking/busLayout.css";
import $ from "jquery";

const Container = styled.div`
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f6f5f5;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const TicketContainer = styled.div`
  padding: 2rem;
`;

const TicketItem = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  padding: 1px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  // display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const BusLayout = ({ selectedSeats, setSelectedSeats }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availableCount, setAvailableCount] = useState(0);
  const [bookedCount, setBookedCount] = useState(0);

  const selectedBus = Buses.find((data) => data.id === parseInt(id));
  const isSleeper = selectedBus && selectedBus.busType === "Sleeper";
  const seatWidth = isSleeper ? "80px" : "25px";

  useEffect(() => {
    if (selectedBus && selectedSeats) {
      const availableSeats = selectedBus.availableSeats || [];
      const bookedSeats = selectedBus.bookedSeats || [];

      setAvailableCount(availableSeats.length);
      setBookedCount(bookedSeats.length);

      availableSeats.forEach((seat) => {
        $(`.ticket-seat-${seat}`).css("background-color", "#fff");
      });

      bookedSeats.forEach((seat) => {
        $(`.ticket-seat-${seat}`).css("background-color", "#b6b4b4");
      });

      selectedSeats.forEach((seat) => {
        $(`.ticket-seat-${seat}`).css("background-color", "#faa935");
      });
    }
  }, [selectedBus, selectedSeats]);

  const isSeatAvailable = (seat) =>
    selectedBus && selectedBus.availableSeats.includes(seat);

  const selectedSeat = (seat) => {
    if (selectedSeats?.includes(seat)) {
      const seats = selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
      setSelectedSeats(seats);
      return;
    }
    setSelectedSeats((prevState) => [...prevState, seat]);
  };

  const isSeatSelected = (seat) => (selectedSeats ?? []).includes(seat);

  const generateSeats = (array, key = "") =>
    array.map((seats, index) =>
      Array.isArray(seats) ? (
        <>
          {seats.map((seat) => (
            <TicketItem
              key={seat}
              className={`ticket-seat-${key}${seat}`}
              style={{
                width: seatWidth,
                background: isSeatSelected(`${key}${seat}`)
                  ? "#faa935"
                  : isSeatAvailable(`${key}${seat}`)
                  ? "#fff"
                  : "#b6b4b4",
                cursor: isSeatAvailable(`${key}${seat}`)
                  ? "pointer"
                  : "not-allowed",
              }}
              onClick={() => {
                if (isSeatAvailable(`${key}${seat}`)) {
                  selectedSeat(`${key}${seat}`);
                }
              }}
            >
              {key} {seat}
            </TicketItem>
          ))}
        </>
      ) : (
        <TicketItem
          key={seats}
          className={`ticket-seat-${key}${seats}`}
          style={{
            width: seatWidth,
            background: isSeatSelected(`${key}${seats}`)
              ? "#faa935"
              : isSeatAvailable(`${key}${seats}`)
              ? "#fff"
              : "#b6b4b4",
            cursor: isSeatAvailable(`${key}${seats}`)
              ? "pointer"
              : "not-allowed",
          }}
          onClick={() => {
            if (isSeatAvailable(`${key}${seats}`)) {
              selectedSeat(`${key}${seats}`);
            }
          }}
        >
          {key} {seats}
        </TicketItem>
      )
    );

  return (
    <Container className="busLayout_container">
      <h2 className="buslayout_title">{selectedBus ? selectedBus.name : ""}</h2>
      <h4 className="text-center">Tickets</h4>
      <p className="text-center ">
        Bus Type: {selectedBus ? selectedBus.busType : ""}
      </p>
      <div className="d-flex">
        <div className="d-flex mb-2 align-items-center">
          <h6>Available -</h6>
          <TicketItem className="ticket-available" style={{ width: seatWidth }}>
            {availableCount}
          </TicketItem>
        </div>

        <div className="d-flex mb-2 align-items-center">
          <h6>Booked -</h6>
          <TicketItem
            className="ticket-booked"
            style={{ width: seatWidth, background: "#b6b4b4" }}
          >
            {bookedCount}
          </TicketItem>
        </div>

        <div className="d-flex mb-2 align-items-center">
          <h6>Selected -</h6>
          <TicketItem
            className="ticket-selected"
            style={{ width: seatWidth, background: "#faa935" }}
          >
            {selectedSeats.length}
          </TicketItem>
        </div>
      </div>
      <ul className="d-flex flex-wrap">
        {isSleeper ? (
          <>
            <TicketContainer className="d-flex align-items-center">
              <h6 className="p-3">Upper</h6>
              <div className="d-flex flex-wrap">
                {generateSeats(selectedBus.seatLayout.upper.first, "U")}

                <div className="d-flex mt-4">
                  {generateSeats(selectedBus.seatLayout.upper.second, "L")}
                </div>
              </div>
            </TicketContainer>

            <TicketContainer className="d-flex align-items-center">
              <h6 className="p-3">Lower</h6>
              <div className="d-flex flex-wrap">
                {generateSeats(selectedBus.seatLayout.lower.first, "L")}

                <div className="d-flex mt-4">
                  {generateSeats(selectedBus.seatLayout.lower.second, "L")}
                </div>
              </div>
            </TicketContainer>
          </>
        ) : (
          <TicketContainer className="d-flex align-items-center">
            <h6 className="p-3">Seater</h6>
            <div className="d-flex flex-wrap">
              {generateSeats(selectedBus.seatLayout.first)}
              <div className="d-flex flex-wrap">
                {generateSeats(selectedBus.seatLayout.second)}
              </div>
            </div>
          </TicketContainer>
        )}
      </ul>

      <div className="d-flex justify-content-center select">
        {selectedSeats?.length > 0 && (
          <h4>Selected Seats = {selectedSeats.join(", ")}</h4>
        )}
      </div>

      <Button
        className="bus-layout-book"
        variant="success"
        onClick={() => navigate("/bus/book")}
        disabled={!(selectedSeats && selectedSeats.length > 0)}
      >
        Book Now
      </Button>
    </Container>
  );
};

export default BusLayout;
