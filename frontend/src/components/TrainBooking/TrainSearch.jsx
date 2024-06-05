import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { Trains, train } from "../../utils/TrainData";
import BusList from "./TrainList";

const Container = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

function TrainSearch({ searchState2, setSearchState2 }) {
  const [filteredBus2, setFilteredBus2] = useState(null);

  const handleSearch = () => {
    setFilteredBus2(
      Trains.filter(
        (data) =>
          data.source === searchState2.from &&
          data.destination === searchState2.to &&
          data.availableDates.includes(searchState2.date)
      )
    );
  };

  return (
    <Container>
      <h2 className="mb-3">Search for Trains</h2>
      <div className="d-flex flex-column align-items-center ">
        <Form.Select
          className="mb-3 width-300 "
          value={searchState2.from}
          onChange={(e) =>
            setSearchState2((prevState) => ({
              ...prevState,
              from: e.target.value,
            }))
          }
        >
          {train.map((data) => (
            <option key={`${data}-source`} value={data}>
              {data}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="mb-3 width-300 "
          value={searchState2.to}
          onChange={(e) =>
            setSearchState2((prevState) => ({
              ...prevState,
              to: e.target.value,
            }))
          }
        >
          {train.map((data) => (
            <option key={`${data}-destination`} value={data}>
              {data}
            </option>
          ))}
        </Form.Select>
        <input
          className="form-control mb-3 width-300"
          type="date"
          value={searchState2.date}
          onChange={(e) =>
            setSearchState2((prevState) => ({
              ...prevState,
              date: e.target.value,
            }))
          }
        />
      </div>
      <Button variant="primary" className="mb-3" onClick={handleSearch}>
        Search
      </Button>
      {filteredBus2 && filteredBus2?.length > 0 && (
        <BusList trains={filteredBus2} />
      )}
      {filteredBus2 && filteredBus2.length === 0 && <h3>No Trains Found!</h3>}
    </Container>
  );
}

export default TrainSearch;
