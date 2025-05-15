const  Interest  = require('../models/interest');

// Create a new interest
exports.createInterest = async (req, res) => {
  try {
    const newInterest = await Interest.create(req.body);
    res.status(201).json(newInterest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all interests
exports.getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.findAll();
    res.json(interests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get interest by ID
exports.getInterestById = async (req, res) => {
  try {
    const interest = await Interest.findByPk(req.params.id);
    if (!interest) return res.status(404).json({ error: 'Interest not found' });
    res.json(interest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete interest
exports.deleteInterest = async (req, res) => {
  try {
    const deleted = await Interest.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Interest not found' });
    res.json({ message: 'Interest deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
