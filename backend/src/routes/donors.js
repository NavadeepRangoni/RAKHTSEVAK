const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const Recipient = require("../models/Recipient");
const sendSMS = require("../utils/sendSMS");

// Dummy Email Sending Function (Replace with real email service)
const sendEmail = async (email, subject, message) => {
  console.log(`📩 Sending email to ${email}: ${subject} - ${message}`);
};

// Function to notify recipient
const notifyRecipient = async (recipient) => {
  try {
    if (recipient.contact) {
      await sendSMS(recipient.contact, "A matching donor is available for your request!");
    }
    if (recipient.email) {
      await sendEmail(recipient.email, "Organ Donor Found!", "A matching donor is available near you!");
    }
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};

// ✅ Register a new donor
router.post("/", async (req, res) => {
  try {
    const { name, bloodType, city, contact } = req.body;
    if (!name || !bloodType || !city || !contact) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }

    const newDonor = new Donor({ name, bloodType, city, contact, available: true });
    await newDonor.save();

    // Check if any recipient is waiting for this blood type in the same city
    const matchedRecipient = await Recipient.findOne({ bloodType, city });

    if (matchedRecipient) {
      await notifyRecipient(matchedRecipient);
      console.log("✅ Recipient notified successfully!");
    }

    res.status(201).json({ message: "✅ Donor registered successfully!", donor: newDonor });
  } catch (error) {
    console.error("❌ Error registering donor:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Fetch all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.error("❌ Error fetching donors:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Mark donor as donated (Updated Logic)
router.put("/:id/donate", async (req, res) => {
  try {
    const { donationDate } = req.body;
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      { donated: true, donationDate, available: false }, 
      { plasmaDonor: req.body.plasmaDonor },// Mark as unavailable too
      { new: true } // Return updated donor
    );

    if (!updatedDonor) {
      return res.status(404).json({ message: "❌ Donor not found." });
    }

    res.json(updatedDonor); // Send updated donor data
  } catch (error) {
    console.error("❌ Error updating donation status:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});


// ✅ Toggle Donor Availability
router.put("/:id/toggle-availability", async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findById(id);

    if (!donor) return res.status(404).json({ message: "❌ Donor not found." });

    donor.available = !donor.available; // Toggle availability
    await donor.save();

    res.json({ message: `✅ Donor availability updated to ${donor.available ? "Available 🟢" : "Unavailable 🔴"}`, donor });
  } catch (error) {
    console.error("❌ Error toggling availability:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;
