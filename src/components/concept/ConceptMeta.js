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
 * @param {string} summary - optional text to show above or instead of stats
 * @param {boolean} stacked - if false will render in 2 columns, if true will be single column
 * @param {boolean} isStats - if true will render the stat value in larger font
 */

const ConceptMeta = props => {
  const { label, stats, summary, stacked, isStats } = props;

  return (
    <div className={classnames('concept-meta', {stacked: stacked & !isStats}, {stats: isStats})}>
      <div className="concept-meta-label">{label}</div>
      {summary && 
        <div className="concept-meta-summary">{summary}</div>
      }
      <div className="concept-meta-stats">
      {
        stats.map((stat, count) => {

          const markup = [
            <div key={`stat-${count}`} className="concept-meta-stat slider-item">
              <div className="concept-meta-stat-label">{stat.label}</div>
              <div className="concept-meta-stat-content">{stat.content}</div>
            </div>
          ];

          if(count < stats.length - 1) {
            markup.push(<div key={`spacer-${count}`} className="concept-meta-spacer" />);
          }

          return markup
        })
      }
      </div>
    </div>
  );
};

ConceptMeta.propTypes = {
  label: PropTypes.string,
  stats: PropTypes.array,
  summary: PropTypes.string,
  stacked: PropTypes.bool,
  isStats: PropTypes.bool
};

ConceptMeta.defaultProps = {
  stacked: false,
  isStats: false,
  stats: [],
  summary: ''
};

export default ConceptMeta;
