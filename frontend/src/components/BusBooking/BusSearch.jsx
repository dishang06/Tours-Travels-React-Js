import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Buses, bus } from "../../utils/BusData";
import BusList from "./BusList";
import '../BusBooking/busSearch.css'



function BusSearch({ searchState, setSearchState }) {
  const [filteredBus, setFilteredBus] = useState(null);

  const handleSearch = () => {
    setFilteredBus(
      Buses.filter(
        (data) =>
          data.source === searchState.from &&
          data.destination === searchState.to &&
          data.availableDates.includes(searchState.date)
      )
    );
  };

  return (
    <div className="busSerch__body">
    <div className="bus_container">
      <h2 className="mb-3 bus_title">Search for Buses</h2>
      <div className="d-flex flex-column align-items-center ">
        <Form.Select
          className="mb-3 width-300 "
          value={searchState.from}
          onChange={(e) =>
            setSearchState((prevState) => ({
              ...prevState,
              from: e.target.value,
            }))
          }
        >
          {bus.map((data) => (
            <option key={`${data}-source`} value={data}>
              {data}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="mb-3 width-300 "
          value={searchState.to}
          onChange={(e) =>
            setSearchState((prevState) => ({
              ...prevState,
              to: e.target.value,
            }))
          }
        >
          {bus.map((data) => (
            <option key={`${data}-destination`} value={data}>
              {data}
            </option>
          ))}
        </Form.Select>
        <input
          className="form-control mb-3 width-300"
          type="date"
          value={searchState.date}
          onChange={(e) =>
            setSearchState((prevState) => ({
              ...prevState,
              date: e.target.value,
            }))
          }
        />
      </div>
      <Button variant="primary" className="mb-3 bus-serch" onClick={handleSearch}>
        Search
      </Button>
      {filteredBus && filteredBus?.length > 0 && (
        <BusList buses={filteredBus} />
      )}
      {filteredBus && filteredBus.length === 0 && <h3>No Buses Found!</h3>}
    </div>
    </div>
  );
}

export default BusSearch;
