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
    location,
    opportunityAreas
  } = props.activePortfolio;

  return (
    <div>
      <h2>{name}</h2>
      <p>Portfolio ID: {id}</p>
      <p>Location: {location}</p>
      <p>Opportunity Areas:<ul>
      {opportunityAreas.map((area, count) => {
        return <li key={`area-${count}`}>{area.name}</li>
      })}
      </ul>
      </p>
    </div> 
  );
};

PortfolioSummary.propTypes = {
  activePortfolio: PropTypes.object.isRequired
};

export default PortfolioSummary;
