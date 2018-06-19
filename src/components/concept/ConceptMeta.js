import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/concept-meta.css';

/**
 * ConceptMeta
 *
 * Renders a passed set of stats label/value pairs
 *
 * @param {string} label - label for the panel
 * @param {array} stats - array of label / content pairs
 */

const ConceptMeta = props => {
  const { label, stats } = props;

  return (
    <div className="concept-meta">
      <div className="concept-meta-label">{label}</div>
      <div className="concept-meta-stats">
      {
        stats.map((stat, count) => {
          return (
            <div className="concept-meta-stat" key={`stat-${count}`}>
              <div className="concept-meta-stat-label">{stat.label}</div>
              <div className="concept-meta-stat-content">{stat.content}</div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
};

ConceptMeta.propTypes = {
  label: PropTypes.string,
  stats: PropTypes.array
};

export default ConceptMeta;
