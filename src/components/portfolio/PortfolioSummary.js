import React from 'react';
import PropTypes from 'prop-types';

/**
 * PortfolioSummary
 *
 * Outputs basic portfolio information
 *
 * @param {object} activePortfolio - from redux store
 */

const PortfolioSummary = props => {
  const {
    id,
    name,
    location
  } = props.activePortfolio;

  return (
    <div>
      <h2>{name}</h2>
      <p>Portfolio ID: {id}</p>
      <p>Location: {location}</p>
    </div> 
  );
};

PortfolioSummary.propTypes = {
  activePortfolio: PropTypes.object.isRequired
};

export default PortfolioSummary;
