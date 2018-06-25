import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/css/concept-meta.css';

/**
 * ConceptMeta
 *
 * Renders a passed set of stats label/value pairs
 *
 * @param {string} label - label for the panel
 * @param {array} stats - array of label / content pairs
 * @param {boolean} stacked - if false will render in 2 columns, if true will be single column
 */

const ConceptMeta = props => {
  const { label, stats, stacked } = props;

  return (
    <div className={classnames('concept-meta', {stacked: stacked})}>
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
  stats: PropTypes.array,
  stacked: PropTypes.bool
};

ConceptMeta.defaultProps = {
  stacked: false
};

export default ConceptMeta;
