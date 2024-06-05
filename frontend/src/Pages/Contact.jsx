import React, { useState } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/contact.css";
import Swal from "sweetalert2";

const Contact = () => {
  const defaultContactForm = {
    name: "",
    email: "",
    number: "",
    message: "",
  };

  const [formData, setFormData] = useState(defaultContactForm);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const { name, email, number, message } = formData;

    if (number.toString().length !== 10) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Number must be 10 digits long.",
      });
    } else if (!name || !email || !number || !message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Fill all details.",
      });
    } else {
      try {
        const response = await fetch("http://localhost:4000/api/v1/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormData(defaultContactForm);
          const data = await response.json();
          console.log(data);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Submitted",
          });
        }
      } catch (error) {}
      // Here you can proceed with submitting the form data or any other action
    }
  };

  return (
    <>
      <CommonSection title={"Contact Us"} />
      <section>
        <div className="form-container">
          <h2>Send your query to us!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              id="name"
              autoComplete="off"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Number"
              id="number"
              autoComplete="off"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            <textarea
              placeholder="Prompt"
              id="message"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
