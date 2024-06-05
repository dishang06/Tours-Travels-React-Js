import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../TrainBooking/busList.css';

const BusListContainer = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const BusItem = styled.div`
`;

export default function BusList({ buses }) {
  const navigate = useNavigate();
  return (
    <BusListContainer className="buslist_container">
      <h2>Available buses </h2>
      {buses.map((bus) => (
        <BusItem
          className="d-flex align-items-center justify-content-between busItem"
          key={bus.id}>
          <div>
            <h3>{bus.name}</h3>
            <p>
              <strong>Source : </strong>
              {bus.source}
            </p>
            <p>
              <strong>destination : </strong>
              {bus.destination}
            </p>
            <p>
              <strong>departure Time : </strong>
              {bus.departureTime}
            </p>
            <p>
              <strong>arrival Time : </strong>
              {bus.arrivalTime}
            </p>
            <p>
              <strong>price : </strong>
              {bus.price}
            </p>
            <p>
              <strong>type : </strong>
              {bus.busType}
            </p>
          </div>
          <div>
            <Button
              className="mb-3 bus-list-book"
              variant="success"
              onClick={() => navigate(`train/${bus.id}`)}
            >
              Book Now
            </Button>
            <h5>Available Seats:{bus.availableSeats.length}</h5>
          </div>
        </BusItem>
      ))}
    </BusListContainer>
  );
}

// const BusListContainer = styled.div`
//   background-color: #f0f0f0;
//   padding: 1rem;
//   border-radius: 5px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const BusItem = styled.div`
//   background-color: white;
//   padding: 1rem;
//   margin: 0.5rem 0;
//   border-radius: 5px;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
// `;

// export default function BusList({ buses }) {
//   const navigate = useNavigate();
//   return (
//     <BusListContainer>
//       <h2>Available buses </h2>
//       {buses.map((bus) => (
//         <BusItem
//           className="d-flex align-items-center justify-content-between "
//           key={bus.id}
//         >
//           <div>
//             <h3>{bus.name}</h3>
//             <p>
//               <strong>Source:</strong>
//               {bus.source}
//             </p>
//             <p>
//               <strong>destination:</strong>
//               {bus.destination}
//             </p>
//             <p>
//               <strong>departure Time:</strong>
//               {bus.departureTime}
//             </p>
//             <p>
//               <strong>arrival Time:</strong>
//               {bus.arrivalTime}
//             </p>
//             <p>
//               <strong>price:</strong>
//               {bus.price}
//             </p>
//             <p>
//               <strong>type:</strong>
//               {bus.busType}
//             </p>
//           </div>
//           <div>
//             <Button
//               className="mb-3"
//               variant="success"
//               onClick={() => navigate(`bus/${bus.id}`)}
//             >
//               Book Now
//             </Button>
//             <h5>Available Seats:{bus.availableSeats.length}</h5>
//           </div>
//         </BusItem>
//       ))}
//     </BusListContainer>
//   );
// }
