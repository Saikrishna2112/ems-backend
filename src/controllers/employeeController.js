const Employee = require("../models/employee");

// POST /
exports.createEmployee = async (req, res) => {
  try {
    let { name, email, mobileNo, designation, gender, course } = req.body;

    gender = (gender || "").toUpperCase();
    if (!["M", "F"].includes(gender)) {
      return res.status(400).json({ message: "Gender must be 'M' or 'F'" });
    }

    if (!Array.isArray(course)) {
      course = course ? String(course).split(",").map(c => c.trim()).filter(Boolean) : [];
    }

    const saved = await Employee.create({ name, email, mobileNo, designation, gender, course });
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating Employee", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /all
exports.getAllEmployee = async (_req, res) => {
  try { res.json(await Employee.find()); }
  catch { res.status(500).json({ message: "Server error" }); }
};

// GET /:id
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch { res.status(500).json({ message: "Server error" }); }
};

// PUT /:id
exports.updateEmployee = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.gender) {
      updates.gender = String(updates.gender).toUpperCase();
      if (!["M", "F"].includes(updates.gender)) {
        return res.status(400).json({ message: "Gender must be 'M' or 'F'" });
      }
    }
    if (updates.course && !Array.isArray(updates.course)) {
      updates.course = String(updates.course).split(",").map(c => c.trim()).filter(Boolean);
    }
    const emp = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch { res.status(500).json({ message: "Server error" }); }
};

// DELETE /:id
exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch { res.status(500).json({ message: "Server error" }); }
};
