const User = require("../../models/user.models");

const transformUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
    };
  } catch (error) {
    throw error;
  }
};

const transformPost = (post) => {
  return {
    ...post._doc,
    _id: post.id,
    user: transformUser.bind(this, post.user),
  };
};

exports.transformPost = transformPost;
