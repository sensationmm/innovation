import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/concept-summary-V1.css';

/**
 * Concept Summary
 *
 * Renders name, strapline and summary
 *
 * @param {string} name - name of the concept
 * @param {string} strapline - strapline for the concept
 * @param {string} summary - short summary of the concept
 */

const ConceptSummaryV1 = props => {
  const { name, strapline, description } = props;

  return (
    <div className="concept-summary">
      <h1>{name}</h1>
      <h2>{strapline}</h2>
      <p>{description}</p>
    </div>
  );
};

ConceptSummaryV1.propTypes = {
  name: PropTypes.string,
  strapline: PropTypes.string,
  description: PropTypes.string
};

export default ConceptSummaryV1;
