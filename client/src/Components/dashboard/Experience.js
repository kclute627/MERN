import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteExp } from "../../actions/profile";

const Experience = ({ experience, deleteExp }) => {
  const experiences = experience.map((cur) => {
    return (
      <tr key={cur._id}>
        <td>{cur.company}</td>
        <td className='hide-sm'>{cur.title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{cur.from}</Moment> -{" "}
          {cur.to === null ? (
            " Current"
          ) : (
            <Moment format='YYYY/MM/DD'>{cur.to}</Moment>
          )}
        </td>
        <td>
          <button onClick={()=>deleteExp(cur._id)}className='btn btn-danger' om>Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className='my-2'> Experience Credentials </h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExp:  PropTypes.func.isRequired,
};

export default connect(null, { deleteExp })(Experience);
