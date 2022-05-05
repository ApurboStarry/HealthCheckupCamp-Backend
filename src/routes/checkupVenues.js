const organizationAuth = require("../middlewares/organizationAuth");
const checkupVenueService = require("../services/checkupVenueService");

const express = require("express");
const router = express.Router();

// GET all checkup venues
router.get("/", async (req, res) => {
  return await checkupVenueService.getAllCheckupVenues(req, res);
});

router.get("/:venueId", async(req, res) => {
  return await checkupVenueService.getCheckupVenueById(req, res);
})

// get all the checkup venues of an organization
router.get("/organization/:organization", async (req, res) => {
  return await checkupVenueService.getAllCheckupVenuesOfOrganization(req, res);
});

// create new checkup venue
// only organization can create one
router.post("/", organizationAuth, async (req, res) => {
  return await checkupVenueService.createNewCheckupVenue(req, res);
})

// remove checkup venue(only an organization can do)
router.delete("/:checkupVenueId", organizationAuth, async (req, res) => {
  return await checkupVenueService.deleteCheckupVenue(req, res);
});

module.exports = router;