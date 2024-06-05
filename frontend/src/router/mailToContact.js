const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "easysharingtripbmu@gmail.com",
    pass: "padz oiss xeoy prma",
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, number, message } = req.body;

  const mailOptions = {
    from: "easysharingtripbmu@gmail.com",
    to: "mihirdomadiya5@gmail.com",
    subject: "New Message from Contact Form",
    text: `
      Name: ${name}\n
      Email: ${email}\n
      Number: ${number}\n
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ success: true, message: "Email sent successfully" });
    }
  });
});
