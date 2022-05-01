const Joi = require("joi");
const express = require("express");
const router = express.Router();

const { validate } = require("../models/organization");
const organizationServices = require("../services/organizationServices");

function validateLoginObject(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

router.post("/login", async (req, res) => {
  const { error } = validateLoginObject(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  return organizationServices.login(req, res);
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  return organizationServices.register(req, res);
});

module.exports = router;
