// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const path = require("path");

// const app = express();

// // Serve static files from the React app
// app.use(
//   express.static(path.join(__dirname, "../../frontend/src/Pages/Contact"))
// );

// // Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Contact form route
// app.post("/contact", (req, res) => {
//   const { name, email, message } = req.body;

//   // Create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "easysharingtripbmu@gmail.com",
//       pass: "padz oiss xeoy prma",
//     },
//   });

//   // Mail options
//   let mailOptions = {
//     from: "easysharingtripbmu@gmail.com",
//     to: "mihirdomadiya5@gmail.com",
//     subject: "New Message from Contact Form",
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   // Send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Error sending message");
//     } else {
//       console.log("Message sent: %s", info.messageId);
//       res.status(200).send("Message sent successfully");
//     }
//   });
// });
