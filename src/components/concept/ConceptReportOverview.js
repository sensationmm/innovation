import React from 'react';
import PropTypes from 'prop-types';

import ContentBox from '../layout/ContentBox';
import FormTextInput from '../layout/FormTextInput';
import FormTextArea from '../layout/FormTextArea';
import RankSelectForm from '../layout/RankSelectForm';

import '../../styles/css/concept-summary.css';

const ConceptReportOverview = (props) => {
  const { conceptName, conceptRank, conceptComments, updateFormField, selectOption } = props;
  return (
    <div>
      <div className="finance-report-overview-name">Concept Name: {conceptName}</div>
      <RankSelectForm
        keyToUpdate="conceptRank"
        rankRange={5}
        selectedValue={conceptRank}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="Rank this concept overall"
        isRequired={true}
      />
      <FormTextArea
        id="conceptComments"
        placeholder="Add any comments"
        onChange={updateFormField}
        value={conceptComments}
      />
    </div>
  )
}

ConceptReportOverview.propTypes = {

}

export default ConceptReportOverview;
