const { check, validationResult } = require("express-validator");
const Post = require("../Models/Post");
const User = require("../Models/User");

const Profile = require("../Models/Profile");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
exports.getPostId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // post does not exist

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    // Check on the user

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "POST REMOVED" });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.likeHandler = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);


        // Check if the post is liked by user 

        if(post.like.filter(cur => cur.user.toString() === req.user.id).length > 0 ){
            return res.status(400).json({msg: 'POst already liked'})
        }

        post.like.unshift({user: req.user.id});

        await post.save();

        res.json(post.like);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
}
exports.unLikeHandler = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);


        // Check if the post is liked by user 

        if(post.like.filter(cur => cur.user.toString() === req.user.id).length === 0 ){
            return res.status(400).json({msg: 'Post has not been liked yet '})
        }

      const removeIndex = post.like.map(cur => cur.user.toString().indexOf(req.user.id))

        post.like.splice(removeIndex, 1);

        await post.save()

        res.json(post.like)
      
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
}

exports.commentHandler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  


    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password')


        // Constuct New Comment 

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id

        };


        post.comments.unshift(newComment);

        await post.save();
         

        res.json(post.comments)

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
}

exports.deleteCommentHandler = async (req, res) => {

  try {
  const post = await Post.findById(req.params.id);


  // Pull out comment 

  const comment = post.comments.find(cur => cur.id === req.params.comment_id );

  // make sure comment exisit 

  if(!comment){
    return res.status(404).json({msg: 'Comment does not exist'})
  }

  // check user

  if(comment.user.toString() !== req.user.id) {
    return res.status(401).json({msg: 'user not authorized'})
  }

  const removeIndex = post.comments
    .map(cur => cur.user.toString())
    .indexOf(req.user.id)


  post.comments.splice(removeIndex, 1);

  await post.save()

  res.json(post.comments)
  
} catch (error) {
  
  console.error(error.message);
  res.status(500).send("Server Error");
}
}
