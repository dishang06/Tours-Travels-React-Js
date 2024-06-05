import React, { useEffect, useState } from "react";
import './admin.css';


const AdminTour = () => {
  const [tour, setTour] = useState([]);

  const getAllTour = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/tours", {
        method: "GET",
      });
      const data = await response.json();
      console.log(`users ${data}`);
      setTour(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllTour();
  }, []);

  return (
    <div>
      <section className="admin-tour-section">
        <div className="admin-container">
          <h1>Admin Tour Data</h1>
        </div>
        <div className="admin-container admin-tour">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Day</th>
                <th>Night</th>
                <th>MaxGroupSize</th>
              </tr>
            </thead>
            <tbody>
              {tour.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.title}</td>
                    <td>{curUser.city}</td>
                    <td>{curUser.distance}</td>
                    <td>{curUser.price}</td>
                    <td>{curUser.day}</td>
                    <td>{curUser.night}</td>
                    <td>{curUser.maxGroupSize}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminTour;
