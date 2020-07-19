import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike, 
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    name,
    date,
    comments,
    like,
    avatar,
    user,
    
  },
}) => {

  
  
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </p>
        <button type='button' class='btn btn-light' onClick={()=> addLike(_id)}>
          <i class='fas fa-thumbs-up'></i>{" "}
          {like.length > 0 && <span>{like.length}</span>}
        </button>
        <button type='button' class='btn btn-light' onClick={()=> removeLike(_id)}>
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussion{" "}
          {comments.length > 0 && (
            <span class='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type='button' class='btn btn-danger' onClick={()=> deletePost(_id)}>
            <i class='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
