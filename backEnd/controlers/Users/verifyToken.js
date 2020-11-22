
const jwt = require('jsonwebtoken')

const HttpError = require('../error/http-error')

const User = require('../models/user')


export const verifyToken = async (req, res, next) => {
  const data = req.userData
  console.log(data)
  let existingUser

  try {
    existingUser = await User.findOne({ email: data.email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
    )
    return next(error)
  }

  // tora pou ksero oti to apssrod einai match thelo na kano generate to json token
  let token
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' },
    )
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
    )
    return next(error)
  }

  // an den eiani fasl ola kala kai ton kano loggedin
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    image: existingUser.image,
  })
}