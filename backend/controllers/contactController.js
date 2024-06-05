import Contact from "../models/Contact.js";

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "Message send successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Message not send successfully" });
  }
};

export default contactForm;
