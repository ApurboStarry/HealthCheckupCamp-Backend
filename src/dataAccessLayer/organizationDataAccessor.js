const { Organization } = require("../models/organization")

async function getOrganizationByEmail(email) {
  const organization = await Organization.findOne({ email: email });
  return organization;
}

async function getOrganizationById(organizationId) {
  const organization = await Organization.findById(organizationId);
  return organization;
}

module.exports = {
  getOrganizationByEmail,
  getOrganizationById
}
