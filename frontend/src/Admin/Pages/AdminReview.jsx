import React, { useEffect, useState } from "react";
import './admin.css';


const AdminReview = () => {
  const [review, setReview] = useState([]);

  const getAllReview = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/reviews",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(`users ${data}`);
      setReview(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllReview();
  }, []);

  return (
    <div>
      <section className="admin-review-section">
        <div className="admin-container">
          <h1>Admin Review Data</h1>
        </div>
        <div className="container admin-review">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(review) && review.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.reviewText}</td>
                    <td>{curUser.rating}</td>
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

export default AdminReview;
