import React from 'react';
import PropTypes from 'prop-types';

import FormTextArea from '../../formInputs/FormTextArea';
import RankSelectForm from '../../formInputs/RankSelectForm';

import '../../../styles/css/concept-summary.css';

const ConceptReportOverview = (props) => {
  const { conceptName, conceptRank, VFComments, updateFormField, selectOption } = props;
  return (
    <div>
      <div className="finance-report-overview-name">Concept Name: {conceptName}</div>
      <RankSelectForm
        keyToUpdate="conceptRank"
        rankRange={3}
        selectedValue={conceptRank}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="Rank this concept overall"
        isRequired={true}
      />
      <FormTextArea
        id="VFComments"
        placeholder="Add any comments"
        onChange={updateFormField}
        value={VFComments}
      />
    </div>
  )
}

ConceptReportOverview.propTypes = {
  conceptName: PropTypes.string,
  conceptRank: PropTypes.number,
  VFComments: PropTypes.string,
  selectOption: PropTypes.func,
  updateFormField: PropTypes.func
}

export default ConceptReportOverview;
