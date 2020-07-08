import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education  from "./Education";
import { Link } from "react-router-dom";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {" "}
        <i className='fas fa-user'></i> Welcome {user && user.name}{" "}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} /> 
          <Education education={profile.education} /> 


          <div className="my-2">
            <button className="btn btn-danger" onClick={()=> deleteProfile()}><i className="fas fa-user-minus"> Delete My Account</i></button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You Have Not Set Up A Profile Please Add Some Info </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(Dashboard);
