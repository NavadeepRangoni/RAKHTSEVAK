import React, { useEffect, useState } from "react";
import axios from "axios";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donors", {
          headers: { "Cache-Control": "no-cache" },
        });
        console.log("✅ Fetched Donors:", response.data); // Adjust API URL if needed
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, [refresh]);

  // ✅ Register Plasma Donor Function
  const registerPlasmaDonor = async (donorId) => {
    try {
      console.log("🔄 Sending plasma donor update request for ID:", donorId);

      const response = await axios.post("http://localhost:5000/api/donors/plasma-donors", {
        donorId,
      });

      console.log("✅ Plasma donor updated:", response.data);
      setRefresh((prev) => !prev);

      // ✅ Update UI to reflect plasma donor status
      setDonors((prevDonors) =>
        prevDonors.map((donor) =>
          donor._id === donorId ? { ...donor, plasmaDonor: true } : donor
        )
      );
    } catch (error) {
      console.error("❌ Error updating plasma donor:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏅 Donor List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gray-800">👤 {donor.name}</h3>
            <p className="text-sm text-gray-600">
              🩸 Blood Type: <span className="font-bold text-red-500">{donor.bloodType}</span>
            </p>
            <p className="text-sm text-gray-600">📍 City: {donor.city}</p>
            <p className="text-sm text-gray-600">📞 Contact: {donor.contact}</p>
            <p className="text-sm text-gray-600">🏆 Donations: {donor.donationCount}</p>

            {/* ✅ Plasma Donor Badge */}
            {donor.plasmaDonor ? (
              <span className="plasma-badge">🔥 Plasma Donor</span>
            ) : (
              <button
                onClick={() => registerPlasmaDonor(donor._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700"
              >
                Donate Plasma
              </button>
            )}

            {/* Badge Display */}
            <span className={`badge ${getBadgeClass(donor.badge)}`}>
              {donor.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Badge Styles
const getBadgeClass = (badge) => {
  switch (badge) {
    case "Gold Donor":
      return "bg-yellow-500 text-white";
    case "Silver Donor":
      return "bg-gray-400 text-white";
    case "Bronze Donor":
      return "bg-orange-500 text-white";
    default:
      return "bg-blue-500 text-white";
  }
};

export default DonorList;
