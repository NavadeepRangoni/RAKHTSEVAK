const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const Recipient = require("../models/Recipient");
const sendSMS = require("../utils/sendSMS");

// Dummy Email Function
const sendEmail = async (email, subject, message) => {
  console.log(`📩 Email sent to ${email}: ${subject} - ${message}`);
};

// Notify recipient via SMS or email
const notifyRecipient = async (recipient) => {
  try {
    if (recipient.contact) await sendSMS(recipient.contact, "A matching donor is available!");
    if (recipient.email) await sendEmail(recipient.email, "Donor Found!", "A matching donor is nearby.");
  } catch (error) {
    console.error("❌ Notification error:", error);
  }
};

// ✅ Register new donor
router.post("/", async (req, res) => {
  try {
    const { name, bloodType, city, contact, plasmaDonor } = req.body;
    if (!name || !bloodType || !city || !contact) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }

    const newDonor = new Donor({
      name,
      bloodType,
      city,
      contact,
      plasmaDonor: plasmaDonor || false,
      available: true,
      donated: false,
      donationCount: 0,
    });

    await newDonor.save();

    const matchedRecipient = await Recipient.findOne({ bloodType, city });
    if (matchedRecipient) await notifyRecipient(matchedRecipient);

    res.status(201).json({ message: "✅ Donor registered successfully!", donor: newDonor });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Donate endpoint (with 2-month restriction)
router.put("/:id/donate", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "❌ Donor not found." });

    const now = new Date();

    // Check if 2 months passed since last donation
    if (donor.donationDate) {
      const lastDate = new Date(donor.donationDate);
      const diffInDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      if (diffInDays < 60) {
        return res.status(403).json({
          message: `❌ Donor must wait ${60 - diffInDays} more day(s) to donate again.`,
        });
      }
    }

    // Update donation info
    donor.donationDate = now;
    donor.donated = true;
    donor.available = false;
    donor.donationCount += 1;

    await donor.save();

    res.json({ message: "✅ Donation recorded.", donor });
  } catch (error) {
    console.error("❌ Donation error:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Toggle availability
router.put("/:id/toggle-availability", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "❌ Donor not found." });

    donor.available = !donor.available;
    await donor.save();

    res.json({
      message: `✅ Donor availability is now ${donor.available ? "Available 🟢" : "Unavailable 🔴"}`,
      donor,
    });
  } catch (error) {
    console.error("❌ Toggle error:", error.message);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;
