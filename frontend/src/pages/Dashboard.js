import React, { useState, useEffect } from "react";
import axios from "axios";
import DonorList from "../components/DonorList";
import Chatbot from "../components/Chatbot";
import "./Dashboard.css";

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [searchBloodType, setSearchBloodType] = useState("All");
  const [searchPlasma, setSearchPlasma] = useState(false); // Toggle between Blood and Plasma donors
  const [currentPage, setCurrentPage] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [donorAvailability, setDonorAvailability] = useState({});
  const [newDonor, setNewDonor] = useState({
    name: "",
    bloodType: "",
    city: "",
    contact: "",
    plasmaDonor: false,
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/donors`);
      setDonors(response.data);

      const availabilityData = {};
      response.data.forEach((donor) => {
        availabilityData[donor._id] = donor.available;
      });
      setDonorAvailability(availabilityData);
    } catch (error) {
      console.error("❌ Error fetching donors:", error);
    }
  };

  const handleRegisterDonor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/donors`, newDonor);
      setDonors([...donors, response.data]); 
      setNewDonor({ name: "", bloodType: "", city: "", contact: "",plasmaDonor: false });
    } catch (error) {
      console.error("❌ Error registering donor:", error);
    }
  };

  const handleDonateClick = async (donorId) => {
    const donationDate = new Date().toISOString();

    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/donors/${donorId}/donate`, {
        donationDate,
      });

      setDonors((prevDonors) =>
        prevDonors.map((donor) =>
          donor._id === donorId ? response.data : donor
        )
      );
    } catch (error) {
      console.error("❌ Error updating donation status:", error);
    }
  };

  const handleToggleAvailability = async (donorId) => {
    const updatedAvailability = !donorAvailability[donorId];

    setDonorAvailability((prev) => ({
      ...prev,
      [donorId]: updatedAvailability,
    }));

    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/donors/${donorId}/availability`, {
        available: updatedAvailability,
      });
    } catch (error) {
      console.error("❌ Error updating availability:", error);
    }
  };

  const isDonationLocked = (donationDate) => {
    if (!donationDate) return false;
    const donationTime = new Date(donationDate).getTime();
    const currentTime = new Date().getTime();
    const diffInDays = (currentTime - donationTime) / (1000 * 60 * 60 * 24);
    return diffInDays < 90;
  };

  const bloodGroupOptions = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const plasmaGroupOptions = ["A+", "B+", "AB+", "O+"]; // Only these are allowed for plasma donations

  const filteredDonors = donors.filter((donor) => {
    const matchesCity = !searchCity || (donor.city && donor.city.toLowerCase().includes(searchCity.toLowerCase()));

    if (searchPlasma) {
      return matchesCity && plasmaGroupOptions.includes(donor.bloodType);
    } else {
      return matchesCity && (searchBloodType === "All" || donor.bloodType === searchBloodType);
    }
  });

  return (
    <div className="dashboard-container">
      <div className="page-switch">
        <button onClick={() => setCurrentPage(0)} className={currentPage === 0 ? "active" : ""}>
          Become a Donor
        </button>
        <button onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "active" : ""}>
          Find a Donor
        </button>
      </div>

      <div className="pages" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
        {/* Page 1 - Become a Donor */}
        <div className="page">
          <h2>🩸 Become a Blood Donor ❤️</h2>

          <div className="donor-section">
            <form className="donor-form" onSubmit={handleRegisterDonor}>
              <input type="text" placeholder="Full Name" value={newDonor.name} onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })} required />
              <select value={newDonor.bloodType} onChange={(e) => setNewDonor({ ...newDonor, bloodType: e.target.value })} required>
                <option value="">Select Blood Type</option>
                {bloodGroupOptions.slice(1).map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              <input type="text" placeholder="City" value={newDonor.city} onChange={(e) => setNewDonor({ ...newDonor, city: e.target.value })} required />
              <input type="text" placeholder="Contact Number" value={newDonor.contact} onChange={(e) => setNewDonor({ ...newDonor, contact: e.target.value })} required />
              <label className="checkbox-container">
                <input type="checkbox" name="plasmaDonor" checked={newDonor.plasmaDonor} onChange={(e) => setNewDonor({ ...newDonor, plasmaDonor: e.target.checked })} />
                🧬 Register as Plasma Donor
              </label>
              <button type="submit">Register as Donor</button>
            </form>
            <div className="plasma-poster">
            <h3> Plasma Donation Matching Rules</h3>
            <table>
              <thead>
                <tr>
                  <th>Donor Blood Group</th>
                  <th>Can Donate Plasma To</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>O (O+, O−)</td>
                  <td className="universal-donor">ALL blood groups (Universal Plasma Donor)</td>
                </tr>
                <tr>
                  <td>A (A+, A−)</td>
                  <td>A, AB</td>
                </tr>
                <tr>
                  <td>B (B+, B−)</td>
                  <td>B, AB</td>
                </tr>
                <tr>
                  <td>AB (AB+, AB−)</td>
                  <td className="universal-recipient">AB only (Universal Plasma Recipient)</td>
                </tr>
              </tbody>
            </table>
          </div>


            <div className="chat-section">
              <button className="chat-toggle-btn" onClick={() => setChatOpen(!chatOpen)}>
                {chatOpen ? "Close Chat" : "Open Chat"}
              </button>
              {chatOpen && <Chatbot />}
            </div>
          </div>
        </div>

        {/* Page 2 - Find a Donor */}
        <div className="page">
          <h3>🔍 Find a Blood Donor</h3>
          <input type="text" placeholder="Enter City" onChange={(e) => setSearchCity(e.target.value)} />
          <select onChange={(e) => setSearchBloodType(e.target.value)}>
            {bloodGroupOptions.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <div className="donor-list">
            {filteredDonors.map((donor) => (
              <div className="donor-card" key={donor._id}>
                <p>📍 {donor.city} | 🩸 {donor.bloodType} | 📞 {donor.contact} | 👤 {donor.name} {donor.plasmaDonor && "🧬"}</p>

                <button className={`availability-btn ${donorAvailability[donor._id] ? "available" : "unavailable"}`} onClick={() => handleToggleAvailability(donor._id)}>
                  {donorAvailability[donor._id] ? "Available" : "Unavailable"}
                </button>

                <button className={"donate-btn " + (donor.donated ? "donated" : "")} onClick={() => handleDonateClick(donor._id)} disabled={donor.donated}>
                  {donor.donated ? "Donated" : "Donate Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
