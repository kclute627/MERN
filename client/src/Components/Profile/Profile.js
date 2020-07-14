import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEducation from "./ProfileEducation";

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  console.log(match.params.id);
  console.log("profileProps", profile);

  return profile !== null ?  (
    <Fragment>
      {profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primar"> Experience </h2>
              {profile.experience.length > 0  ? (
                <Fragment>
                  {profile.experience.map((cur) => {
                    console.log(cur, "cur");
                    return <ProfileExp key={cur._id} exp={cur } />;
                  })}
                </Fragment>
              ) : (
                <h4> No Experiences </h4>
              )}

              <h2 className="text-primar">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education && profile.education.map((cur) => (
                    <ProfileExp key={cur._id} education={cur} />
                  ))}
                </Fragment>
              ) : (
                <h4> No Education Listed </h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
      ;
    </Fragment>
  ): <div></div>;
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
