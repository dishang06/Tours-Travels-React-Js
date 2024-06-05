import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  message: {
    type: String,
  },
});

export default mongoose.model("contact", contactSchema);
