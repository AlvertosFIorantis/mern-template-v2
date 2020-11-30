const express = require("express");
const { check } = require("express-validator");

// middleware gia na tsekaro TOKEN
const checkAuth = require("../middleware/check-auth");

const createProject = require("../controlers/Projects/createProject");

const getProjects = require("../controlers/Projects/getProjects");

const router = express.Router();

router.post(
  "/createproject",
  [check("projectName").isLength({ min: 6 })],
  // protected route
  checkAuth,
  createProject
);

router.get("/myprojects", checkAuth, getProjects);

module.exports = router;
