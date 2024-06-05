import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TrainListContainer = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const TrainItem = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function TrainList({ trains }) {
  const navigate = useNavigate();
  return (
    <TrainListContainer>
      <h2>Available trains </h2>
      {trains.map((train) => (
        <TrainItem
          className="d-flex align-items-center justify-content-between "
          key={train.id}
        >
          <div>
            <h3>{train.name}</h3>
            <p>
              <strong>Source:</strong>
              {train.source}
            </p>
            <p>
              <strong>destination:</strong>
              {train.destination}
            </p>
            <p>
              <strong>departure Time:</strong>
              {train.departureTime}
            </p>
            <p>
              <strong>arrival Time:</strong>
              {train.arrivalTime}
            </p>
            <p>
              <strong>price:</strong>
              {train.price}
            </p>
          </div>
          <div>
            <Button
              className="mb-3"
              variant="success"
              onClick={() => navigate(`train/${train.id}`)}
            >
              Book Now
            </Button>
            <h5>Available Seats:{train.availableSeats.length}</h5>
          </div>
        </TrainItem>
      ))}
    </TrainListContainer>
  );
}
