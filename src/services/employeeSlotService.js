const { validateEmployeeSlot } = require("../models/employeeSlot");
const employeeDataAccessor = require("../dataAccessLayer/employeeDataAccessor");
const checkupVenueDataAccessor = require("../dataAccessLayer/checkupVenueDataAccessor");
const employeeSlotDataAccessor = require("../dataAccessLayer/employeeSlotDataAccessor");

function isValidDate(date) {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
}

async function allocateSlot(req, res) {
  const { error } = validateEmployeeSlot(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }

  const checkupVenue = checkupVenueDataAccessor.getCheckupVenueById(req.body.checkupVenueId);
  if(!checkupVenue) {
    return res.status(400).send("Invalid checkup venue");
  }

  if(!isValidDate(req.body.scheduledAt)) {
    return res.status(400).send("Invalid date");
  }

  await employeeSlotDataAccessor.allocateSlot(req.user._id, req.body.checkupVenueId, req.body.scheduledAt, req.body.notes);
  return res.status(200).send("");
}

async function rescheduleSlot(req, res) {
  // is valid slot id
  const slotId = req.params.slotId;
  const employeeSlot = employeeSlotDataAccessor.getSlotById(slotId);
  if(!employeeSlot) {
    return res.status(400).send("Invalid slot ID");
  }

  // is valid date
  const newSchedule = req.params.newSchedule
  if(!isValidDate(newSchedule)) {
    return res.status(400).send("Invalid date");
  }

  // update
  const newEmployeeSlot = await employeeSlotDataAccessor.rescheduleSlot(slotId, newSchedule);
  return res.status(200).send(newEmployeeSlot);
}

async function cancelSlot(req, res) {
  // is vald slot id
  const slotId = req.params.slotId;
  const employeeSlot = employeeSlotDataAccessor.getSlotById(slotId);
  if (!employeeSlot) {
    return res.status(400).send("Invalid slot ID");
  }

  // delete
  const newEmployeeSlot = await employeeSlotDataAccessor.cancelSlot(slotId);
  return res.status(200).send(newEmployeeSlot);
}

async function markSlotAsCompleted(req, res) {
  // is valid slot id
  const slotId = req.params.slotId;
  const employeeSlot = employeeSlotDataAccessor.getSlotById(slotId);
  if (!employeeSlot) {
    return res.status(400).send("Invalid slot ID");
  }

  // update
  const newSlot = await employeeSlotDataAccessor.markSlotAsCompleted(slotId);
  return res.status(200).send(newSlot);
}

async function getAllAllocatedSlotsInCheckupVenue(req, res) {
  const checkupVenueId = req.params.checkupVenueId;
  const employeeSlots =
    await employeeSlotDataAccessor.getAllAllocatedSlotsInCheckupVenue(
      checkupVenueId
    );
  return res.status(200).send(employeeSlots);
}

module.exports = {
  allocateSlot,
  rescheduleSlot,
  cancelSlot,
  markSlotAsCompleted,
  getAllAllocatedSlotsInCheckupVenue
}