const { CheckupVenue, validateCheckupVenue } = require("../models/checkupVenue");
const checkupVenueDataAccessor = require("../dataAccessLayer/checkupVenueDataAccessor");
const employeeSlotDataAccessor = require("../dataAccessLayer/employeeSlotDataAccessor");

async function getAllCheckupVenues(req, res) {
  const checkupVenues = await checkupVenueDataAccessor.getAllCheckupVenues();
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
  getAllCheckupVenues,
  createNewCheckupVenue,
  deleteCheckupVenue
};