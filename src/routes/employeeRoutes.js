const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const roleAuth = require("../middleware/roleMiddleware");
const {
  createEmployee, getAllEmployee, getEmployeeById, updateEmployee, deleteEmployee
} = require("../controllers/employeeController");

// HR/Manager can create, update, delete
router.post("/", auth, roleAuth(["HR", "Manager"]), createEmployee);
router.put("/:id", auth, roleAuth(["HR", "Manager"]), updateEmployee);
router.delete("/:id", auth, roleAuth(["HR", "Manager"]), deleteEmployee);

// All logged-in users can view
router.get("/all", auth, getAllEmployee);
router.get("/:id", auth, getEmployeeById);

module.exports = router;
