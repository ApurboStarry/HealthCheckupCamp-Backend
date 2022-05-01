const Joi = require("joi");
const mongoose = require("mongoose");

const employeeSlotSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  checkupVenueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CheckupVenue",
  },
  scheduledAt: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "ALLOCATED"
  },
  notes: {
    type: String
  }
});

const EmployeeSlot = mongoose.model("EmployeeSlot", employeeSlotSchema);

function validateEmployeeSlot(employeeSlot) {
  const schema = Joi.object({
    checkupVenueId: Joi.string().required(),
    scheduledAt: Joi.string().required(),
    notes: Joi.string().min(0).max(255).required()
  });

  return schema.validate(employeeSlot);
}

exports.EmployeeSlot = EmployeeSlot;
exports.validateEmployeeSlot = validateEmployeeSlot;
