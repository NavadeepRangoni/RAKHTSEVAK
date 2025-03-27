const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
});

const Recipient = mongoose.model("Recipient", recipientSchema);
module.exports = Recipient;
