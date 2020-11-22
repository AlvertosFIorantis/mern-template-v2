const jwt = require("jsonwebtoken");

const HttpError = require("../../error/http-error");

const User = require("../../models/user");
const bcrypt = require("bcryptjs");

// Na thimame na kano export to const pou ftiaxno sto telos tou file
//to functinality pou trexei otan thelo na kano login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Login...");
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  // prota tsekaro an exo to user
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  // an exo to user tsekaro an to incomign email teriazei me to eimail pou exo sto database EXo to isVlaidPaswoard declare ekso apo to try catch gia na boro na to xirismopiso kai sto ifstmane pio kato
  let isValidPassword = false;
  try {
    // to passwriod mesa sto compair eiani to incomniv passowrd kai tsekaro an teriazei me to passwrod pou exo sto database pou eian ito existingUser.passwrod afto giranei true false kai to kano store sto isValidPassowrd dummy varialbe
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    // to erorr edo mesa den eiani oti dne teriazoun ta password ala oti eixa kapio texniko provlima gia afto kano meta pio kato to ifasmetns sto isValidPassord gia na do an odos teriazoun ta passowrd i oxi
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }
  // an eianai false simei oti exo lathos password kai kano send piso error

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  // tora pou ksero oti to apssrod einai match thelo na kano generate to json token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  // an den eiani fasl ola kala kai ton kano loggedin
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    image: existingUser.image,
  });
};

module.exports = login;
