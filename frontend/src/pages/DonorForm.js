import React, { useState } from "react";

const DonorForm = ({ onDonorAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "O+",
    plasmaDonor: false, // ✅ New Field for Plasma Donation
    city: "",
    contact: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Error Display

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // ✅ Handle checkbox state
    });
    setErrorMessage(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Before Sending:", formData); // Debugging

    if (!formData.name || !formData.bloodType || !formData.city || !formData.contact) {
      setErrorMessage("❌ All fields are required.");
      return;
    }

    if (!/^\d{10,}$/.test(formData.contact)) {
      setErrorMessage("❌ Contact number must be at least 10 digits.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/donors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", response.status); // Debugging
      const data = await response.json();
      console.log("Response Data:", data); // Debugging

      if (response.ok) {
        alert("✅ Donor added successfully!");
        setFormData({ name: "", bloodType: "O+", isPlasmaDonor: false, city: "", contact: "" }); // ✅ Reset Form
        setErrorMessage("");

        if (onDonorAdded) {
          onDonorAdded(); // ✅ Refresh Donor List
        }
      } else {
        setErrorMessage(`❌ Failed to add donor: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setErrorMessage("❌ Error adding donor. Ensure the backend is running and CORS is enabled.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Become a Blood Donor</h3>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* ✅ Show error message */}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
        <option value="O+">O+</option>
        <option value="A+">A+</option>
        <option value="B+">B+</option>
        <option value="AB+">AB+</option>
      </select>

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
      />

      {/* ✅ Plasma Donor Checkbox */}
      <label>
        <input type="checkbox" name="plasmaDonor" checked={formData.plasmaDonor} onChange={handleChange} />
        🧬 Register as Plasma Donor
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DonorForm;
