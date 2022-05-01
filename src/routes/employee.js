const Joi = require("joi")
const express = require('express');
const router = express.Router();

const { Employee, validate } = require("../models/employee");
const employeeServices = require("../services/employeeServices");

function validateLoginObject(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

router.post("/login", async(req, res) => {
  const { error } = validateLoginObject(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  return employeeServices.login(req, res)
});

router.post("/register", async(req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  return employeeServices.register(req, res);
});

module.exports = router;