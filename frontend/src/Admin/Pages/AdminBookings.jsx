import React, { useEffect, useState } from "react";
import "./admin.css";

const AdminBookings = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllTours = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/bookings",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await response.json();
      console.log(`Tours data:`, data);
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
      setError("Failed to fetch tours. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTours();
  }, []);

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/bookings/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      const data = await response.json();
      console.log(`Deleted booking:`, data);
      getAllTours();
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking. Please try again later.");
    }
  };

  return (
    <div>
      <section className="admin-tours-section">
        <div className="admin-container">
          <h1>Admin Book Data</h1>
        </div>
        <div className="admin-container admin-tours">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Tour Name</th>
                  <th>Name</th>
                  <th>Guest Size</th>
                  <th>Number</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((curTour) => (
                  <tr key={curTour._id}>
                    <td>{curTour.userEmail}</td>
                    <td>{curTour.tourName}</td>
                    <td>{curTour.fullName}</td>
                    <td>{curTour.guestSize}</td>
                    <td>{curTour.phone}</td>
                    <td>
                      <button onClick={() => deleteBooking(curTour._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminBookings;
