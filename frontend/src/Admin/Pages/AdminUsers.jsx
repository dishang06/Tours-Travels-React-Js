import React, { useEffect, useState } from "react";
import "./admin.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/users", {
        method: "GET",
      });
      const data = await response.json();
      console.log(`users ${data}`);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(`users ${data}`);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="admin-users-section">
        <div className="admin-container">
          <h1>Admin user data</h1>
        </div>
        <div className="admin-container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Update</th> */}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    {/* <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                    </td> */}
                    <td>
                      <button onClick={() => deleteUser(curUser._id)}>
                        Delete  
                      </button>
                    </td>
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

export default AdminUsers;
