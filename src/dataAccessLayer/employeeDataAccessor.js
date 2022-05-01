const { Employee } = require("../models/employee");

async function getEmployeeByEmail(email) {
  const employee = await Employee.findOne({ email: email });
  return employee;
}

async function getEmployeeById(employeeId) {
  const employee = await Employee.findById(employeeId);
  return employee;
}

module.exports = {
  getEmployeeByEmail,
  getEmployeeById
};