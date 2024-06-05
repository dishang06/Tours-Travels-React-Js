const twilio = require("twilio");

// Your Twilio Account SID and Auth Token
const accountSid = "AC6d27b4c31b6e73575a44c9ce1d3b2226";
const authToken = "cf86540f9a4ec8679171182aea149b33";

// Create a Twilio client
const client = twilio(accountSid, authToken);

const sendSMS = () => {
  // Send SMS function
  client.messages
    .create({
      body: "This is a test message from Twilio!",
      to: "+919265410753", // Receiver's phone number
      from: "+16562253381", // Your Twilio phone number
    })
    .then((message) => {
      console.log("Message sent successfully! SID:", message.sid);
    })
    .catch((err) => {
      console.error("Error sending message:", err);
    });
};

export default sendSMS; // Export sendSMS as the default export
