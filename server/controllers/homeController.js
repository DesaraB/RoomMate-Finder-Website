const Home = require("../models/home");

// Create a new home listing
exports.createHome = async (req, res) => {
  try {
    const newHome = await Home.create(req.body);
    res.status(201).json(newHome);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all homes
exports.getAllHomes = async (req, res) => {
  try {
    const homes = await Home.findAll();
    res.json(homes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get home by ID
exports.getHomeById = async (req, res) => {
  try {
    const home = await Home.findByPk(req.params.id);
    if (!home) return res.status(404).json({ error: "Home not found" });
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update home
exports.updateHome = async (req, res) => {
  try {
    const [updated] = await Home.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: "Home not found" });
    res.json({ message: "Home updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete home
exports.deleteHome = async (req, res) => {
  try {
    const deleted = await Home.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Home not found" });
    res.json({ message: "Home deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
