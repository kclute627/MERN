const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const postController = require("../../Controllers/postsController");

// @route       POST   api/post
//@description  create a post
//@access       Private
router.post(
  "/",
  [auth, [check("text", "Text is Required").not().isEmpty()]],

  postController.createPost
);

// @route      GET   api/post
//@description  Get all Posts
//@access       Private

router.get("/", auth, postController.getAllPost);

// @route      GET   api/post/:id
//@description  Get post by id
//@access       Private

router.get("/:id", auth, postController.getPostId);

// @route      DELETE   api/post/:id
//@description  Delete a post
//@access       Private

router.delete("/:id", auth, postController.deletePost);

// @route      PUT   api/post/like/:id
//@description  Like a Post
//@access       Private

router.put("/like/:id", auth, postController.likeHandler);
router.put("/unlike/:id", auth, postController.unLikeHandler);

// @route      POST   api/post/comment/:id
//@description  add a comment to a post 
//@access       Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  postController.commentHandler
);

// @route      DELETE   api/post/comment/:id/:comment_id
//@description  Delete a post 
//@access       Private

router.delete(
    "/comment/:id/:comment_id",
    auth, 
    postController.deleteCommentHandler
  );

module.exports = router;
