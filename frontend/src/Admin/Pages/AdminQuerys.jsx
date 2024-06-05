import React, { useState, useEffect } from "react";
import './admin.css';

const AdminQuerys = () => {
  const [querys, setQuerys] = useState([]);

  const getAllQuerys = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/querys",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(`users ${data}`);
      setQuerys(data);
    } catch (error) {
      console.error("Error fetching querys:", error);
    }
  };

  useEffect(() => {
    getAllQuerys();
  }, []);

  return (
    <div>
      <section className="admin-querys-section">
        <div className="admin-container">
          <h1>Admin Query Data</h1>
        </div>
        <div className="container admin-querys">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Query</th>
              </tr>
            </thead>
            <tbody>
              {querys.length > 0 ? (
                querys.map((curUser, index) => (
                  <tr key={index}>
                    <td>{curUser.name}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.number}</td>
                    <td>{curUser.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminQuerys;
