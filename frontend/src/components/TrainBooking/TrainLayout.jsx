import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Trains } from "../../utils/TrainData";

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const TicketContainer = styled.div`
  padding: 0.5rem;
`;

const TicketItem = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  padding: 1px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const TrainLayout = ({ selectedSeats2, setSelectedSeats2 }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedBus = Trains.find((data) => data.id === parseInt(id));
  const isSleeper = selectedBus.busType === "Sleeper";
  const seatWidth = isSleeper ? "80px" : "25px";

  const isSeatAvailable = (seat) => selectedBus.availableSeats.includes(seat);

  const selectedSeat2 = (seat) => {
    if (selectedSeats2?.includes(seat)) {
      const seats = selectedSeats2.filter(
        (selectedSeat2) => selectedSeat2 !== seat
      );
      setSelectedSeats2(seats);
      return;
    }
    console.log("setSelected" + seat);
    setSelectedSeats2((prevState) => [...prevState, seat]);
  };

  const isSeatSelected = (seat) => (selectedSeats2 ?? []).includes(seat);

  const generateSeats = (array, key = "") =>
    array.map((seats, index) =>
      Array.isArray(seats) ? (
        <>
          {seats.map((seat) => (
            <TicketItem
              key={seat}
              style={{
                width: seatWidth,
                background: isSeatSelected(`${key}${seat}`)
                  ? "#318beb"
                  : isSeatAvailable(`${key}${seat}`)
                  ? "#fff"
                  : "#b6b4b4",
                cursor: isSeatAvailable(`${key}${seat}`) ? "pointer" : "",
              }}
              onClick={() => selectedSeat2(`${key}${seat}`)}
            >
              {key} {seat}
            </TicketItem>
          ))}
        </>
      ) : (
        <TicketItem
          key={seats}
          style={{
            width: seatWidth,
            background: isSeatSelected(`${key}${seats}`)
              ? "#318beb"
              : isSeatAvailable(`${key}${seats}`)
              ? "#fff"
              : "#b6b4b4",
            cursor: isSeatAvailable(`${key}${seats}`) ? "pointer" : "",
          }}
          onClick={() => selectedSeat2(`${key}${seats}`)}
        >
          {key} {seats}
        </TicketItem>
      )
    );

  return (
    <Container>
      <h2>{selectedBus.name}</h2>
      <h4>Tickets</h4>
      <p>Bus Type: {selectedBus.busType}</p>
      <div className="d-flex">
        <div className="d-flex mb-2 align-sitems-center">
          <h6>Available -</h6>
          <TicketItem style={{ width: seatWidth }}>{1}</TicketItem>
        </div>

        <div className="d-flex mb-2 align-items-center">
          <h6>Booked -</h6>
          <TicketItem style={{ width: seatWidth, background: "#b6b4b4" }}>
            {1}
          </TicketItem>
        </div>

        <div className="d-flex mb-2 align-items-center">
          <h6>Selected -</h6>
          <TicketItem style={{ width: seatWidth, background: "#318beb" }}>
            {1}
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
            <div>Seater</div>
            {generateSeats(selectedBus.seatLayout.first)}
            <div className="mt-4">
              {generateSeats(selectedBus.seatLayout.second)}
            </div>
          </TicketContainer>
        )}
      </ul>

      <div className="d-flex justify-content-center">
        {selectedSeats2?.length > 0 && (
          <h4>Selected Seats = {selectedSeats2.join(", ")}</h4>
        )}
      </div>

      <div>
        <Button
          className="ms-3"
          variant="success"
          onClick={() => navigate("/train/book")}
          disabled={!(selectedSeats2 && selectedSeats2.length > 0)}
        >
          Book Now
        </Button>
      </div>
    </Container>
  );
};

export default TrainLayout;
