function validator(req, res, next) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const usernameRegex = /^[a-z](\w){1,}/gi;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (!usernameRegex.test(req.body.username)) {
    next(
      "username is not valid, it should start with letters and contains only letters, numbers and uderscore"
    );
  } else if (!emailRegex.test(req.body.email)) {
    next("Invalid email address");
  // } else if (!passwordRegex.test(req.body.password)) {
  //   next(
  //     "Invalid password, must contain at least one letter small character, capital character, sympols and numbers and at least 6 characters long and not more than 16"
  //   );
  } else {
    next();
  }
}

module.exports = validator;
