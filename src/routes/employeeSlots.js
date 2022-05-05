const express = require("express");
const router = express.Router();

const employeeAuth = require("../middlewares/employeeAuth");
const organizationAuth = require("../middlewares/organizationAuth");
const employeeSlotService = require("../services/employeeSlotService");

// book a slot, only an employee can do
router.post("/allocateSlot", employeeAuth, async (req, res) => {
  return await employeeSlotService.allocateSlot(req, res);
});

// reschedule a slot, only an employee can do
router.put("/rescheduleSlot/:slotId/:newSchedule", employeeAuth, async(req, res) => {
  return await employeeSlotService.rescheduleSlot(req, res);
})

// cancel a slot, only an employee can do
router.delete("/cancelSlot/:slotId", employeeAuth, async (req, res) => {
  return await employeeSlotService.cancelSlot(req, res);
});

// mark a slot as completed, only organization can do
router.put("/markAsCompleted/:slotId", organizationAuth, async (req, res) => {
  return await employeeSlotService.markSlotAsCompleted(req, res);
})

// list of allocated slots, only organization can access
router.get("/allAllocatedSlots/:checkupVenueId", organizationAuth, async (req, res) => {
  return await employeeSlotService.getAllAllocatedSlotsInCheckupVenue(req, res);
})

// all allocated slots allocated by an employee
router.get("/allAllocatedSlotsByAnEmployee/:checkupVenueId", employeeAuth, async (req, res) => {
  return await employeeSlotService.getAllAllocatedSlotsByAnEmployee(req, res);
});

module.exports = router;