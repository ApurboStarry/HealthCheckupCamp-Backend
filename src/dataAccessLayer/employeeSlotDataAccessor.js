const { EmployeeSlot } = require("../models/employeeSlot");

async function getSlotById(slotId) {
  const employeeSlot = EmployeeSlot.findById(slotId);
  return employeeSlot;
}

async function allocateSlot(employeeId, checkupVenueId, scheduledAt, notes) {
  const employeeSlot = new EmployeeSlot({
    employeeId,
    checkupVenueId,
    scheduledAt,
    notes
  });

  await employeeSlot.save();
  return;
}

async function rescheduleSlot(slotId, newSchedule) {
  const employeeSlot = await EmployeeSlot.findOneAndUpdate(
    { _id: slotId },
    { scheduledAt: newSchedule },
    { new: true }
  );

  return employeeSlot;
}

async function cancelSlot(slotId) {
  const employeeSlot = await EmployeeSlot.findOneAndUpdate(
    { _id: slotId },
    { status: "CANCELED" },
    { new: true }
  );

  return employeeSlot;
}

async function markSlotAsCompleted(slotId) {
  const employeeSlot = await EmployeeSlot.findOneAndUpdate(
    { _id: slotId },
    { status: "COMPLETED" },
    { new: true }
  );

  return employeeSlot;
}

async function getAllAllocatedSlotsInCheckupVenue(checkupVenueId) {
  const employeeSlots = await EmployeeSlot.find({ checkupVenueId: checkupVenueId, status: "ALLOCATED" });
  return employeeSlots;
}

async function deleteSlotsWithCheckupVenueId(checkupVenueId) {
  return await EmployeeSlot.deleteMany({ checkupVenueId: checkupVenueId });
}

module.exports = {
  getSlotById,
  allocateSlot,
  rescheduleSlot,
  cancelSlot,
  markSlotAsCompleted,
  getAllAllocatedSlotsInCheckupVenue,
  deleteSlotsWithCheckupVenueId
};