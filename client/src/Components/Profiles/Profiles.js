import React, { Fragment, useEffect } from "react";
import Spinner from "../Layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getProfiles} from '../../actions/profile'

const Profiles = ({getProfiles, profile: profiles, loading}) => {

    useEffect(()=> {
        getProfiles();

    }, [getProfiles])

  return(
       <div>   

     </div>
  );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);
