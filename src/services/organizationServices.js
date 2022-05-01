const bcrypt = require("bcrypt");

const organizationDataAccessor = require("../dataAccessLayer/organizationDataAccessor");
const { Organization } = require("../models/organization");

async function login(req, res) {
  let organization = await organizationDataAccessor.getOrganizationByEmail(req.body.email);
  if (!organization) {
    return res.status(400).send("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    organization.password
  );
  if (!isValidPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = organization.generateAuthToken();
  res.send(token);
}

async function register(req, res) {
  let organization = await organizationDataAccessor.getOrganizationByEmail(req.body.email);
  if (organization) {
    return res.status(400).send("Organization already registered");
  }

  organization = new Organization({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
  });

  const salt = await bcrypt.genSalt(10);
  organization.password = await bcrypt.hash(organization.password, salt);

  await organization.save();
  await Organization.findOneAndUpdate(
    {
      _id: organization._id,
    },
    {
      new: true,
    }
  );

  const token = organization.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({ _id: organization._id, email: organization.email });
}

module.exports.login = login;
module.exports.register = register;
