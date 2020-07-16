import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PropTypes from "prop-types";
import Spinner from '../Layout/Spinner';
import PostItem from './PostItem'

const Posts = ({getPosts, post: {posts, loading}}) => {

    useEffect(()=> {
        getPosts()
    }, [getPosts])

  return loading ? <Spinner/> :
  <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
          <i className="fas fa-user"></i> Welcome to the Community
      </p>
        {/* post form  */}
        <div className="posts">
            {posts.map(cur=> (
            <PostItem key={cur._id} post={cur}/>
            ))}
        </div>

  </Fragment>;
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
