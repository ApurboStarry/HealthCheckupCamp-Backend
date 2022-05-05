const { CheckupVenue, validateCheckupVenue } = require("../models/checkupVenue");
const objectIdChecker = require('../utils/objectIdChecker');

async function getAllCheckupVenues() {
  const checkupVenues = await CheckupVenue.find().populate("organization", "_id name");
  return checkupVenues;
}

async function getCheckupVenueById(id) {
  if(!objectIdChecker.isValidObjectId(id)) {
    return null;
  }

  const checkupVenue = await CheckupVenue.findById(id).populate("organization", "_id name");
  return checkupVenue;
}

async function getAllCheckupVenuesOfOrganization(organization) {
  const checkupVenues = await CheckupVenue.find({ organization });
  return checkupVenues;
}

async function insertCheckupVenue(name, location, organization) {
  const checkupVenue = new CheckupVenue({
    name,
    location,
    organization,
  });
  await checkupVenue.save();
}

async function deleteCheckupVenue(checkupVenueId) {
  return await CheckupVenue.findOneAndRemove({ _id: checkupVenueId });
}

module.exports = {
  getCheckupVenueById,
  getAllCheckupVenues,
  getAllCheckupVenuesOfOrganization,
  insertCheckupVenue,
  deleteCheckupVenue,
}

