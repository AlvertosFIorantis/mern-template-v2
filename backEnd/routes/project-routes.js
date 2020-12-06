const express = require("express");
const { check } = require("express-validator");

// middleware gia na tsekaro TOKEN
const checkAuth = require("../middleware/check-auth");

const createProject = require("../controlers/Projects/createProject");

const getProjects = require("../controlers/Projects/getProjects");
const deleteProject = require("../controlers/Projects/deleteProject");
const getProjectGroupByStatus = require("../controlers/Projects/getProjectGroupByStatus");

const router = express.Router();

router.post(
  "/createproject",
  [check("projectName").isLength({ min: 6 })],
  // protected route
  checkAuth,
  createProject
);

router.get("/myprojects", checkAuth, getProjects);

// exo to autth middleware giati thelo mono o xristis pou exei ftaiksi to project na bori na to diagrapsei
router.get("/project/:projectid", checkAuth, deleteProject);

// afto to route eain gia to aggegation
router.get("/statsGroupyByStatus", checkAuth, getProjectGroupByStatus);

module.exports = router;
