import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import './admin.css';


const AdminUpdate = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
  });

  const params = useParams();
  console.log("Params single user:", params);

  const getSingleUserData = async (req, res) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/users/${params.id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(`users single data ${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/users/update/${params.id}`,
        {
          method: "GET",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Update successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div>
        <h1>Update User Data</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>userName</label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              value={data.userName}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="Email"
              name="useremail"
              id="useremail"
              autoComplete="off"
              value={data.email}
              onChange={handleInput}
              required
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminUpdate;
