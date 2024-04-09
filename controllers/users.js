const User = require("../models/user");

const renderRegister = (req, res) => {
  res.render("users/register");
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", `${e.message}`, "Please try again!");
    res.redirect("/register");
  }
};

const renderLogin = (req, res) => {
  res.render("users/login");
};

const login = (req, res) => {
  req.flash("success", "Welcome Back!");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};

module.exports = { renderRegister, register, renderLogin, login, logout };
