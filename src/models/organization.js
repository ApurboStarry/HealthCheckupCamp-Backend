const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  }
});

organizationSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, userType: "organization" },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Organization = mongoose.model("Organization", organizationSchema);

function validateOrganization(organization) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(organization);
}

exports.Organization = Organization;
exports.validate = validateOrganization;
