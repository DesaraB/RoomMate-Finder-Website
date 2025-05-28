const User = require("../models/user");
const bcrypt = require("bcryptjs");
const HttpError = require("../errorHandler");
const jwt = require("jsonwebtoken");

exports.logout = async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({ status: 200, message: "You are logout" });
};

exports.login = async (req, res) => {
  try {
    //const pass = req.body.password --forma e gjate per te mar te dhena nga body
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpError("You are not registered", 404);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new HttpError("You password does not match", 401);
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "7d", // optional
    });
    res.cookie("jwt", token, {
      httpOnly: true,
    });

    const { password: _, ...safeUser } = user.get({ plain: true });
    res.status(200).json({ status: 200, user: safeUser });
  } catch (error) {
    res.status(400).json({ error: error.message, status: error.status });
  }
};
