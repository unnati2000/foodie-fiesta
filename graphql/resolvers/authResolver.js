const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.models");

module.exports = {
  createUser: async (args) => {
    try {
      const exisitingUser = await User.findOne({ email: args.userInput.email });
      if (exisitingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        channelname: args.userInput.channelname,
        password: hashedPassword,
      });

      const result = user.save();

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesupersecretkey"
      );

      return { ...result._doc, password: null, id: result._id };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesupersecretkey"
      );
      return { userId: user.id, token: token };
    } catch (error) {
      throw error;
    }
  },
  me: async (args, req) => {
    try {
      if (!req.userId.userId) {
        throw new Error("Unauthenticated");
      }

      const user = await User.findById(req.userId.userId);

      return { ...user._doc };
    } catch (error) {
      throw error;
    }
  },
};
