const BloodRequest = require('../models/BloodRequest');

exports.createRequest = async (req, res) => {
    try {
        const { patientName, bloodType, hospital, city, contact, urgency } = req.body;
        const bloodRequest = await BloodRequest.create({ patientName, bloodType, hospital, city, contact, urgency, userId: req.user.id });
        res.status(201).json(bloodRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find().populate('userId', 'name contact');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
