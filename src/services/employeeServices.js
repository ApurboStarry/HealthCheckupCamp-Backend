const bcrypt = require("bcrypt");

const { Employee } = require("../models/employee")
const employeeDataAccessor = require("../dataAccessLayer/employeeDataAccessor");


async function login(req, res) {
  let employee = await employeeDataAccessor.getEmployeeByEmail(req.body.email);
  if (!employee) {
    return res.status(400).send("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    employee.password
  );
  if (!isValidPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = employee.generateAuthToken();
  res.send(token);
}

async function register(req, res) {
  let employee = await employeeDataAccessor.getEmployeeByEmail(req.body.email);
  if (employee) {
    return res.status(400).send("Employee already registered");
  }

  employee = new Employee({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
  });

  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(employee.password, salt);

  await employee.save();
  await Employee.findOneAndUpdate(
    {
      _id: employee._id,
    },
    {
      new: true,
    }
  );

  const token = employee.generateAuthToken();
  return res
          .header("x-auth-token", token)
          .header("access-control-expose-headers", "x-auth-token")
          .send({ _id: employee._id, email: employee.email });
}

module.exports = {
  login,
  register
}