const sendSMS = require("../utils/sendSMS");
const sendEmail = require("../utils/sendEmail");
const Donor = require("../models/Donor");

// ✅ Function to register a plasma donor
const registerPlasmaDonor = async (req, res) => {
  try {
    console.log("📌 Request received:", req.body); 
    const { donorId } = req.body; // Ensure frontend sends donorId
    if (!donorId) {
      return res.status(400).json({ message: "Donor ID is required" });
    }

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    donor.plasmaDonor = true; // ✅ Update plasmaDonor field
    await donor.save();

    console.log(`✅ Donor ${donor.name} registered as Plasma Donor`);
    res.status(200).json({ message: "Plasma donor registered successfully", donor });
  } catch (error) {
    console.error("❌ Error registering plasma donor:", error);
    res.status(500).json({ message: "Server error registering plasma donor", error });
  }
};

// ✅ Function to get all plasma donors
const getPlasmaDonors = async (req, res) => {
  try {
    const plasmaDonors = await Donor.find({ plasmaDonor: true });
    console.log(`📢 Plasma donors fetched: ${plasmaDonors.length}`);
    res.json(plasmaDonors);
  } catch (error) {
    console.error("❌ Error fetching plasma donors:", error);
    res.status(500).json({ message: "Server error fetching plasma donors" });
  }
};

module.exports = { registerPlasmaDonor, getPlasmaDonors };


// Notify recipients when a matching donor is found
const notifyRecipient = async (recipient) => {
  if (recipient.contact) {
    await sendSMS(recipient.contact, "A matching donor is available for your request!");
  }
  if (recipient.email) {
    await sendEmail(recipient.email, "Organ Donor Found!", "A matching donor is available near you!");
  }
};

// Example: Call this function when a donor matches a recipient
const matchDonor = async (donor) => {
  const recipient = await Recipient.findOne({ bloodType: donor.bloodType, city: donor.city });

  if (recipient) {
    await notifyRecipient(recipient);
    console.log("✅ Recipient notified successfully!");
  }
};
const Donor = require("../models/Donor");

// Plasma Compatibility Rules
const plasmaCompatibility = {
  "O+": ["O+", "A+", "B+", "AB+"],
  "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], // Universal donor
  "A+": ["A+", "AB+"],
  "A-": ["A+", "A-", "AB+", "AB-"],
  "B+": ["B+", "AB+"],
  "B-": ["B+", "B-", "AB+", "AB-"],
  "AB+": ["AB+"], // Universal plasma recipient
  "AB-": ["AB+", "AB-"],
};

// ✅ Register a Plasma Donor
exports.registerPlasmaDonor = async (req, res) => {
  try {
    const { name, bloodType, city, contact, plasmaDonor } = req.body;

    const newDonor = new Donor({
      name,
      bloodType,
      city,
      contact,
      plasmaDonor: plasmaDonor || false,
    });

    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Get Compatible Plasma Donors
exports.getPlasmaDonors = async (req, res) => {
  try {
    const { bloodType } = req.query;

    if (!bloodType || !plasmaCompatibility[bloodType]) {
      return res.status(400).json({ error: "Invalid blood type" });
    }

    const compatibleTypes = plasmaCompatibility[bloodType];
    const plasmaDonors = await Donor.find({
      bloodType: { $in: compatibleTypes },
      plasmaDonor: true,
      available: true,
    });

    res.json(plasmaDonors);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

