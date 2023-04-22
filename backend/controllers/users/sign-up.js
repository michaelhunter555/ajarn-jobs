const HttpError = require("../../models/http-error");
const User = require("../../models/users");
const { validationResult } = require("express-validator");

//POST user sign-up
const signup = async (req, res, next) => {
  //make sure user inputs satisfy requirments
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError(
      "Please check check that your inputs match requirements and try again. Passwords must be at least 7 characters long and contain 1 number",
      422
    );
  }
  //we expect name, email and password
  const { name, email, password } = req.body;

  //check if e-mail already exists
  let hasUser;
  //try email
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    //if issue with call, return next error
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  //if user does already exist, return next error
  if (hasUser) {
    const error = new Error(
      "A user already exists under the current e-mail.",
      404
    );
    return next(error);
  }

  //create new instance of User object with required fields
  const createdUser = new User({ name, email, password });
  //try to create user
  try {
    await createdUser.save();
  } catch (err) {
    //if issue with call, return next error
    const error = new HttpError("signing up failed, please try again", 500);
    return next(error);
  }

  //render json data of new user
  res.status(201).json({ user: createdUser });
};

module.exports = signup;
