const express = require("express");

const error = require("../middlewares/error");
const employee = require("../routes/employee");
const organization = require("../routes/organization");
const checkupVenues = require("../routes/checkupVenues");
const employeeSlots = require("../routes/employeeSlots");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/v1/employee", employee);
  app.use("/api/v1/organization", organization);
  app.use("/api/v1/checkupVenues", checkupVenues);
  app.use("/api/v1/employeeSlots", employeeSlots)

  app.use(error);
};
