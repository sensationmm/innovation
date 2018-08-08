import React from 'react';
import PropTypes from 'prop-types';

import RankSelectForm from '../../formInputs/RankSelectForm';

const ConceptReportRanking = (props) => {
  const { solutionScore, businessModelScore, marketSizeScore, corpAdvantageScore, selectOption } = props;
  return (
    <div>
      <RankSelectForm
        keyToUpdate="solutionScore"
        rankRange={3}
        selectedValue={solutionScore}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="Solution"
      />
      <RankSelectForm
        keyToUpdate="businessModelScore"
        rankRange={3}
        selectedValue={businessModelScore}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="Business Model"
      />
      <RankSelectForm
        keyToUpdate="marketSizeScore"
        rankRange={3}
        selectedValue={marketSizeScore}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="Market Size"
      />
      <RankSelectForm
        keyToUpdate="corpAdvantageScore"
        rankRange={3}
        selectedValue={corpAdvantageScore}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="Corporate Advantage"
      />
    </div>
  )
}

ConceptReportRanking.propTypes = {
  solutionScore: PropTypes.number,
  businessModelScore: PropTypes.number,
  marketSizeScore: PropTypes.number,
  corpAdvantageScore: PropTypes.number,
  selectOption: PropTypes.func
}

export default ConceptReportRanking;
