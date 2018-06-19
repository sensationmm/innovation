import React from 'react';
// import PropTypes from 'prop-types';

import ProgressDot from '../ProgressDot';
import ConceptMeta from './ConceptMeta';

/**
 * Concept Progress
 *
 * Renders a set of progress metrics into the ConceptMeta component
 *
 * @return a ConceptMeta object
 */

const ConceptProgress = props => {
  // const {  } = props;

  const stats = [
    {
      label: 'Progress Metric 1',
      content: (
        <ProgressDot
          progress={0.8}
          color="pink"
        />
      )
    },
    {
      label: 'Progress Metric 3',
      content: (
        <ProgressDot
          progress={0.6}
          color="blue"
        />
      )
    },
    {
      label: 'Progress Metric 2',
      content: (
        <ProgressDot
          progress={0.4}
          color="green"
        />
      )
    },
    {
      label: 'Progress Metric 4',
      content: (
        <ProgressDot
          progress={0.5}
          color="yellow"
        />
      )
    }
  ];

  return <ConceptMeta label="Concept Progress" stats={stats} />;
};

ConceptProgress.propTypes = {
  
};

export default ConceptProgress;
