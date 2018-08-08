import React from 'react';
import PropTypes from 'prop-types';

import ConceptAnalysisDisplay from './ConceptAnalysisDisplay';
import ContentBox from '../layout/ContentBox';

import { financeScoreOptions } from '../../config/conceptOptions';

const ConceptAnalysis = (props) => {
  const { conceptAnalysis } = props;
  return (
    <div>
      <ContentBox border padded>
        <ConceptAnalysisDisplay
          label='Concept Analysis'
          stats={Object.keys(conceptAnalysis).map(key => ({
            label: financeScoreOptions[key].title,
            score: conceptAnalysis[key].value,
            description: conceptAnalysis[key].description,
            comment: conceptAnalysis[key].comment
          }))}
        />
      </ContentBox>
    </div>
  )
}


ConceptAnalysis.propTypes = {
  conceptAnalysis: PropTypes.object
};

export default ConceptAnalysis;
