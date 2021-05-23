const Post = require("../../models/post.models");
const { transformPost } = require("./merge");
module.exports = {
  createPost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated!");
      }
      const post = new Post({
        steps: args.postInput.steps,
        postedBy: req.userId.userId,
        title: args.postInput.title,
        photo: args.postInput.photo,
      });
      const result = await post.save();
      return { ...result._doc, id: result._id };
    } catch (error) {
      throw error;
    }
  },
  posts: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated!");
      }
      const posts = await Post.find({});
      return posts.map((post) => {
        return transformPost(post);
      });
    } catch (error) {
      throw error;
    }
  },
  post: async ({ postId }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated!");
      }
      const post = await Post.findById(postId);
      return { ...post._doc };
    } catch {
      throw error;
    }
  },
  myposts: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated!");
      }

      const posts = await Post.find({ postedBy: req.userId.userId });

      return posts.map((post) => {
        return transformPost(post);
      });
    } catch (error) {
      throw error;
    }
  },

  addComment: async ({ postId, comment }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }

      let post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      post.comment.unshift({
        text: comment.text,
        username: comment.username,
      });

      post.save();
      return { ...post._doc };
    } catch (error) {
      throw error;
    }
  },

  likePost: async ({ postId }, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated");
    }

    let post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: req.userId },
      },
      { new: true }
    );

    return { ...post._doc };
  },
  unlikePost: async ({ postId }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not authenticated");
      }

      let post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated!");
      }
      let post = await Post.findById(args.postId);

      if (!post) {
        throw new Error("Post does not exist");
      }

      if (args.postId === req.userId) {
        post = await Post.findByIdAndDelete(args.postId);
      } else {
        throw new Error("You're not authorized to delete this post");
      }

      return { ...args.postId };
    } catch (error) {
      throw error;
    }
  },
};
