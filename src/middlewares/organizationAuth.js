const config = require("config");
const jwt = require("jsonwebtoken");

const organizationDataAccessor = require("../dataAccessLayer/organizationDataAccessor");

async function organizationAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.organization = decodedPayload;

    const organization = await organizationDataAccessor.getOrganizationById(req.organization._id);
    if(!organization) {
      return res.status(400).send("Invalid organization ID");
    }

    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
}

module.exports = organizationAuth;
