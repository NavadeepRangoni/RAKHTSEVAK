const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  donated: { type: Boolean, default: false }, // ✅ Tracks donation status
  donationCount: { type: Number, default: 0 },  // ✅ Tracks number of donations
  badge: { type: String, default: 'New Donor' }, 
  available: { type: Boolean, default: true },
  plasmaDonor: { type: Boolean, default: false },// ✅ Assigns donor badge
});

// Function to get badge based on donation count
const getBadge = (donationCount) => {
  if (donationCount >= 10) return 'Gold Donor';
  if (donationCount >= 5) return 'Silver Donor';
  if (donationCount >= 2) return 'Bronze Donor';
  return 'New Donor';
};

// Middleware to update badge before saving donor data
donorSchema.pre('save', function (next) {
  this.badge = getBadge(this.donationCount);
  next();
});

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
