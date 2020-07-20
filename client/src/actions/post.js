import axios from 'axios';
import { setAlert } from './alert';
import {GET_POSTS, POST_ERRORS, UPDATE_LIKES, DELETE_POSTS, ADD_POSTS} from './types';



// Get Posts 
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS, 
            payload: res.data,
        })

    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: {
              msg: error.response.statusText,
              status: error.response.status,
            },
          });

        
    }
}

//ADD LIKE 
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES, 
            payload: {id, likes: res.data},
        })

    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: {
              msg: error.response.statusText,
              status: error.response.status,
            },
          });

        
    }
}

//remove Like

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES, 
            payload: {id, likes: res.data},
        })

    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: {
              msg: error.response.statusText,
              status: error.response.status,
            },
          });

        
    }
}

// delete posts 

export const deletePost = id => async dispatch => {
    try {
       await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POSTS, 
            payload: id,
        })

       dispatch(setAlert('Post Rmoved', "danger"))

    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: {
              msg: error.response.statusText,
              status: error.response.status,
            },
          });

        
    }
}

//addpost

export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.post(`/api/posts/`, formData, config);

        dispatch({
            type: ADD_POSTS, 
            payload: res.data,
        })

       dispatch(setAlert('Post Created', "success"))

    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: {
              msg: error.response.statusText,
              status: error.response.status,
            },
          });

        
    }
}