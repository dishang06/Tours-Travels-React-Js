import React, { useState, useEffect } from "react";
import "./admin.css";

const Admintickets = () => {
  const [tickets, setTickets] = useState([]);

  const getAlltickets = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/tickets",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(`users ${data}`);
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    getAlltickets();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/tickets/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(`users ${data}`);

      if (response.ok) {
        getAlltickets();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="admin-tickets-section">
        <div className="admin-container">
          <h1>Admin Bus Tickets Data</h1>
        </div>
        <div className="admin-container admin-tickets">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Seat Number</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((curUser, index) => (
                  <tr key={index}>
                    <td>{curUser.name}</td>
                    <td>{curUser.age}</td>
                    <td>{curUser.seatNumber}</td>
                    <td>
                      <button onClick={() => deleteUser(curUser._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Admintickets;
