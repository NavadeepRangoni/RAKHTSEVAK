const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
    patientName: String,
    bloodType: String,
    hospital: String,
    city: String,
    contact: String,
    urgency: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);
