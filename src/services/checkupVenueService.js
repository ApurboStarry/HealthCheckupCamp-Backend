const { CheckupVenue, validateCheckupVenue } = require("../models/checkupVenue");
const checkupVenueDataAccessor = require("../dataAccessLayer/checkupVenueDataAccessor");
const employeeSlotDataAccessor = require("../dataAccessLayer/employeeSlotDataAccessor");
const organizationDataAccessor = require("../dataAccessLayer/organizationDataAccessor");

async function getAllCheckupVenues(req, res) {
  const checkupVenues = await checkupVenueDataAccessor.getAllCheckupVenues();
  return res.status(200).send(checkupVenues);
}

async function getCheckupVenueById(req, res) {
  const checkupVenue = await checkupVenueDataAccessor.getCheckupVenueById(req.params.venueId);
  if(!checkupVenue) {
    return res.status(400).send("No checkup venue with the given ID was found");
  }

  return res.status(200).send(checkupVenue);
}

async function getAllCheckupVenuesOfOrganization(req, res) {
  const organization = await organizationDataAccessor.getOrganizationById(req.params.organization);
  if(!organization) {
    return res.status(400).send("No organization with the given ID was found");
  }

  const checkupVenues = await checkupVenueDataAccessor.getAllCheckupVenuesOfOrganization(req.params.organization);
  return res.status(200).send(checkupVenues);
}

async function createNewCheckupVenue(req, res) {
  const { error } = validateCheckupVenue(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }

  checkupVenueDataAccessor.insertCheckupVenue(req.body.name, req.body.location, req.organization._id);
  return res.status(200).send("");
}

async function deleteCheckupVenue(req, res) {
  const checkupVenueId = req.params.checkupVenueId;
  await employeeSlotDataAccessor.deleteSlotsWithCheckupVenueId(checkupVenueId);
  await checkupVenueDataAccessor.deleteCheckupVenue(checkupVenueId);

  return res.status(200).send("");
}

module.exports = {
  getCheckupVenueById,
  getAllCheckupVenues,
  getAllCheckupVenuesOfOrganization,
  createNewCheckupVenue,
  deleteCheckupVenue
};