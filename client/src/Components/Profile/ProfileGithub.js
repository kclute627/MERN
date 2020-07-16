import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {

    useEffect(()=>{
        getGithubRepos(username)
    }, [getGithubRepos, username] )

  return (
      <div className="profile-github">
          <h2 className="text-primary">
              Github Repos
          </h2>
          {repos === null ? <Spinner/> : (
              repos.map(cur=>(
                  <div key={repos._id} className="repo bg-white p-1 my-1">
                      <div className="">
                          <h4>
                              <a href={cur.html_url} target='_blank' rel='noopener norefer'>
                                  {cur.name}
                              </a>
                          </h4>
                          <p>{cur.description}</p>
                      </div>
                      <div className="">
                          <ul>
                              <li className="badge badge-primary">
                                  Stars: {cur.stargazers__count}
                              </li>
                              <li className="badge badge-dark">
                                  Watchers: {cur.watchers__count}
                              </li>
                              <li className="badge badge-primary">
                                  Forks: {cur.forks__count}
                              </li>
                          </ul>
                      </div>
                  </div>
              ))
          )}
      </div>
  )
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
