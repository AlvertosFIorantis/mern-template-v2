const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
// middleware gia na tsekaro TOKEN
const checkAuth = require("../middleware/check-auth");

//edo prosthetot to extra URL ala to kirio url gia na pao se afta ta routes einai sto index.js file ekei pou exo /api/useres ara gia na pao sto signup route prpeie na stilo /apu/users/signup

// kano import to function signup apo to separate folder
const signup = require("../controlers/Users/signUp");
// kano import to function login apo to separate folder
const login = require("../controlers/Users/login");
// kano import to verifyToken  apo to separate folder
const verifyToken = require("../controlers/Users/verifyToken");

const router = express.Router();

router.post(
  "/signup",
  // vazo to fileUpload middleware oste na boro na anevaso image se afto to route to 'image' einai ena "key" pou exo sto request opos exo passwrod kai email opote prepei na valo ena "key" gia to image sto frontend
  fileUpload.single("image"),
  //ektelo san middleware ti logiki pou thelo apo to express validator gia ta incoming data
  [
    check("email").normalizeEmail().isEmail(),
    // to normailize kanei to kefalo mikra gramata
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);

// route gia na kano refresh to token i logik vriskete sto controloer folder
router.get("/verify", checkAuth, verifyToken);

module.exports = router;
