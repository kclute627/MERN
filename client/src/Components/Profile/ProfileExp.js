import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileExp = ({
    exp: {company='', from, to, description, title, location}
}) => 
{console.log(company)
  return(
    <div>
      <h3 className="text-dar">{company}</h3>
      <p className="">
        <Moment format="YYYY/MM/DD"> {from}</Moment> -{" "}
        {!to ? "current" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p className="">
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

ProfileExp.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default ProfileExp;
