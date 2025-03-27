const express = require('express');
const Donor = require('../models/Donor'); // import the Donor model
const { registerPlasmaDonor, getPlasmaDonors } = require('../controllers/donorcontroller');

const router = express.Router();

// Function to assign badges based on donation count
const getBadge = (donationCount) => {
  if (donationCount >= 10) return "Gold Donor";
  if (donationCount >= 5) return "Silver Donor";
  if (donationCount >= 2) return "Bronze Donor";
  return "New Donor";
};

// 📌 STEP 2 - ✅ POST: Add a new donor (Including Plasma Donor)
router.post("/", async (req, res) => {
  try {
    const { name, bloodType, city, contact, plasmaDonor } = req.body; // ✅ Ensure plasmaDonor is received

    if (!name || !bloodType || !city || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDonor = new Donor({
      name,
      bloodType,
      city,
      contact,
      donated: false,
      donationCount: 0,
      badge: "New Donor",
      plasmaDonor: plasmaDonor || false, // ✅ Ensure plasmaDonor is stored
    });

    await newDonor.save();
    console.log("✅ Donor added:", newDonor);

    res.status(201).json({ message: "Donor added successfully!", donor: newDonor });
  } catch (error) {
    console.error("❌ Error adding donor:", error);
    res.status(500).json({ message: "Error adding donor", error });
  }
});

// 📌 GET: Fetch all donors (Including both available & donated)
router.get("/all", async (req, res) => {
  try {
    const donors = await Donor.find();
    console.log("📢 All donors fetched:", donors.length);
    res.json(donors);
  } catch (error) {
    console.error("❌ Error fetching all donors:", error);
    res.status(500).json({ message: "Server error fetching donors" });
  }
});

// 📌 GET: Fetch only available donors (who haven't donated yet)
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find({ donated: false });
    console.log("📢 Available donors fetched:", donors.length);
    res.json(donors);
  } catch (error) {
    console.error("❌ Error fetching available donors:", error);
    res.status(500).json({ message: "Server error fetching available donors" });
  }
});

// 📌 STEP 2 - ✅ Register & Get Plasma Donors
// Updated to handle POST request for registering plasma donors correctly.
router.post("/plasma-donors", async (req, res) => {
  const { donorId } = req.body;

  try {
    // Find the donor by ID and update the plasmaDonor field to true
    const donor = await Donor.findByIdAndUpdate(donorId, { plasmaDonor: true }, { new: true });

    // Return the updated donor object as the response
    res.status(200).json(donor);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("❌ Error updating plasma donor status:", error);
    res.status(500).json({ error: 'Error updating plasma donor status' });
  }
});

// GET route to fetch plasma donors
router.get("/plasma-donors", getPlasmaDonors);

// 📌 PATCH: Mark donor as "Donated" & Update Badge
router.patch("/:id/donate", async (req, res) => {
  try {
    const donorId = req.params.id;

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    donor.donationCount += 1;
    donor.badge = getBadge(donor.donationCount);
    donor.donated = false; // Ensure donor remains available after donation

    await donor.save();
    console.log(`✅ Donor ${donor.name} updated. New badge: ${donor.badge}`);

    res.json({ message: "Donor updated successfully", donor });
  } catch (error) {
    console.error("❌ Error updating donor:", error);
    res.status(500).json({ message: "Server error updating donor" });
  }
});

// 📌 DELETE: Remove a donor from the database
router.delete("/:id", async (req, res) => {
  try {
    const donorId = req.params.id;

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    await Donor.findByIdAndDelete(donorId);
    console.log(`✅ Donor ${donor.name} removed from database`);

    res.json({ message: "Donor removed successfully" });
  } catch (error) {
    console.error("❌ Error deleting donor:", error);
    res.status(500).json({ message: "Server error deleting donor" });
  }
});

module.exports = router;
