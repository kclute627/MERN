import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((cur) => {
    return (
      <tr key={cur._id}>
        <td>{cur.school}</td>
        <td className='hide-sm'>{cur.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{cur.from}</Moment> -{" "}
          {cur.to === null ? (
            " Current"
          ) : (
            <Moment format='YYYY/MM/DD'>{cur.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => deleteEducation(cur._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className='my-2'> Education Credentials </h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
