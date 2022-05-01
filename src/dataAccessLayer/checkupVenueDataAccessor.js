const { CheckupVenue, validateCheckupVenue } = require("../models/checkupVenue");

async function getAllCheckupVenues() {
  const checkupVenues = await CheckupVenue.find();
  return checkupVenues;
}

async function getCheckupVenueById(id) {
  const checkupVenue = await CheckupVenue.findById(id);
  return checkupVenue;
}

async function insertCheckupVenue(name, location, organizationId) {
  const checkupVenue = new CheckupVenue({
    name,
    location,
    organizationId,
  });
  await checkupVenue.save();
}

async function deleteCheckupVenue(checkupVenueId) {
  return await CheckupVenue.findOneAndRemove({ _id: checkupVenueId });
}

module.exports = {
  getAllCheckupVenues,
  getCheckupVenueById,
  insertCheckupVenue,
  deleteCheckupVenue,
}

