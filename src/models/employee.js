const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
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
    max: 255
  },
  age: {
    type: Number,
    required: true,
    min: 20,
    max: 70
  }
});

employeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, userType: "employee" },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(employee) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    age: Joi.number().min(20).max(70).required()
  });

  return schema.validate(employee);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
