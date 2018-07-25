import React from 'react';
import PropTypes from 'prop-types';

import FormTextArea from '../../formInputs/FormTextArea';
import RankSelectForm from '../../formInputs/RankSelectForm';

import '../../../styles/css/concept-create.css';

const ConceptConviction = (props) => {
  const { gmConviction, gmComments, partnerPreferences, selectOption, updateFormField } = props;
  return (
    <div>
      <RankSelectForm
        keyToUpdate="gmConviction"
        rankRange={5}
        selectedValue={gmConviction}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="GM's Conviction"
      />
      <FormTextArea
        id="gmComments"
        placeholder="GM's Comments"
        onChange={updateFormField}
        value={gmComments}
      />
      <FormTextArea
        id="partnerPreferences"
        placeholder="Comments on Corporate Partner preferences"
        onChange={updateFormField}
        value={partnerPreferences}
      />
    </div>
  )
}

ConceptConviction.propTypes = {
  gmConviction: PropTypes.number,
  gmComments: PropTypes.string,
  partnerPreferences: PropTypes.string,
  unitEconomics: PropTypes.string,
  selectOption: PropTypes.func,
  updateFormField: PropTypes.func
}

export default ConceptConviction;
