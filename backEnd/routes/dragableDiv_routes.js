const express = require("express");
const { check } = require("express-validator");

// middleware gia na tsekaro TOKEN
const checkAuth = require("../middleware/check-auth");

const createDragableDiv = require("../controlers/DragableDiv/createDragableDiv");
const getDragableDivs = require("../controlers/DragableDiv/getDragableDivs");

const router = express.Router();

router.post(
  "/createdragablediv",
  // protected route
  checkAuth,
  createDragableDiv
);

router.get("/getdragabledivs", checkAuth, getDragableDivs);

module.exports = router;
