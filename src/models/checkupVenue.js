const Joi = require("joi");
const mongoose = require("mongoose");

const checkupVenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  location: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

const CheckupVenue = mongoose.model("CheckupVenue", checkupVenueSchema);

function validateCheckupVenue(checkupVenue) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    location: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(checkupVenue);
}

exports.CheckupVenue = CheckupVenue;
exports.validateCheckupVenue = validateCheckupVenue;
