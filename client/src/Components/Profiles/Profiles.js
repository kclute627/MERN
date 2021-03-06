import React, { Fragment, useEffect } from "react";
import Spinner from "../Layout/Spinner";
import PropTypes from "prop-types";
import ProfileItem from './ProfileItem'
import { connect } from "react-redux";
import {getProfiles} from '../../actions/profile'

const Profiles = ({getProfiles, profile: {profiles, loading }}) => {

    useEffect(()=> {
        getProfiles(); 

    }, [getProfiles]);
    console.log("profiles", profiles)

  return(
       <Fragment>
           { loading ? <Spinner/> : <Fragment>
               <h1 className='large text-primary'>Developers </h1>
               <p className="lead">
                   <i className="fab fa-connectdevelop"></i>   
                   Browse and connect with developers  
               </p>
               <div className="profiles">

                   {profiles.length > 0 ? (
                       profiles.map(cur => (
                           console.log(cur, 'cur'),
                           <ProfileItem key={cur._id} profile={cur}></ProfileItem>
                           
                       ))
                   ) : <h4> No Profiles Found </h4>}
               </div>
               </Fragment>}

  </Fragment>
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
