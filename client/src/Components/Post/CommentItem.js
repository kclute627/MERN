import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import {deleteComment} from '../../actions/post'

const CommentItem = ({
  auth,
  comment: { _id, text, name, avatar, user, date },
  key,
  postId,
  deleteComment
}) => {
  return (
    <div class="post bg-white p-1 my-1"> 
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
          {text}
        </p>
        <p class="post-date">Posted on <Moment format="MM/DD/YYYY">{date}</Moment></p>
        {!auth.loading && user === auth.user._id && (
            <button onClick={e => deleteComment(postId, _id)} className = 'btn btn-danger' type="button">
                <i className="fas fa-times"></i>

            </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
