const config = require("config");
const jwt = require("jsonwebtoken");

const employeeDataAccessor = require("../dataAccessLayer/employeeDataAccessor");

async function employeeAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedPayload;

    const employee = await employeeDataAccessor.getEmployeeById(req.user._id);
    if (!employee) {
      return res.status(400).send("Invalid employee ID");
    }

    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
}

module.exports = employeeAuth;
