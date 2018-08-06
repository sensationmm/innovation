import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/css/concept-meta.css';

/**
 * ConceptAnalysisDisplay
 *
 * Renders a passed set of stats label/value pairs
 *
 * @param {string} label - label for the panel
 * @param {array} stats - array of data objects to display { label, score, description, comment }
 * @param {string} summary - optional text to show above or instead of stats
 */

const ConceptAnalysisDisplay = props => {
  const { label, stats, summary } = props;
  console.log('props', props);
  return (
    <div className="concept-meta">
      <div className="concept-meta-label">{label}</div>
      {summary &&
        <div className="concept-meta-summary">{summary}</div>
      }
      <div className="concept-meta-stats">
      {
        stats.map((stat, count) => (
          <div key={`stat-${count}`} className="concept-meta-stat">
            <div className="concept-meta-stat-label">{stat.label}</div>
            <div className="concept-meta-stat-score">{stat.score}</div>
            <div className="concept-meta-stat-description">{stat.description}</div>
            <div className="concept-meta-stat-comment">{stat.comment}</div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

ConceptAnalysisDisplay.propTypes = {
  label: PropTypes.string,
  stats: PropTypes.array,
  summary: PropTypes.string
};

ConceptAnalysisDisplay.defaultProps = {
  stats: [],
  summary: ''
};

export default ConceptAnalysisDisplay;
