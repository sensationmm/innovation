import React from 'react';
import PropTypes from 'prop-types';

/**
 * InnovationSummary
 *
 * Outputs basic innovation information
 *
 * @param {object} activeInnovation - from redux store
 */

const InnovationSummary = props => {
  const {
    id,
    name,
    location,
    opportunityAreas
  } = props.activeInnovation;

  return (
    <div>
      <h2>{name}</h2>
      <p>Innovation ID: {id}</p>
      <p>Location: {location}</p>
      <p>Opportunity Areas:</p>
      <ul>
      {opportunityAreas.map((area, count) => {
        return <li key={`area-${count}`}>{area.name}</li>
      })}
      </ul>
    </div>
  );
};

InnovationSummary.propTypes = {
  activeInnovation: PropTypes.object.isRequired
};

export default InnovationSummary;
