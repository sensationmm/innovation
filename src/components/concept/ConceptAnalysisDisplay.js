import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/concept-meta.css';

import { analysisDisplayColours } from '../../config/conceptOptions';

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
            <div
              className="concept-meta-stat-description"
              style={{ color: analysisDisplayColours[stat.score] }}
              >
                {stat.description}
            </div>
            <div className="concept-meta-stat-comment">{(stat.comment.length === 0 || !stat.comment) ? 'No comment' : stat.comment}</div>
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
