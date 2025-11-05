const employee = require('../models/employee');
const Employee = require('../models/employee');

exports.createEmployee = async (req, res) => {
  try {
    let { name, email, mobileNo, designation, gender, course } = req.body;

    // validate gender
    gender = (gender || "").trim().toUpperCase();
    if (!["M", "F"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender. Must be M or F" });
    }

    // handle courses array properly
    if (!Array.isArray(course)) {
      course = course ? course.split(",").map(c => c.trim()) : [];
    }

    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
    });

    const saved = await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully", employee: saved });

  } catch (err) {
    console.error("Error creating Employee", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllEmployee = async (req,res) =>{
  try{
    const employee = await Employee.find();
    res.json(employee);
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:'Server Error'});
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updates = req.body;
    const emp = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};