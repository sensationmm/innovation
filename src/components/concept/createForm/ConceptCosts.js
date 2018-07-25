import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../../formInputs/FormTextInput';
import SingleSelectBtnForm from '../../formInputs/SingleSelectBtnForm';

import '../../../styles/css/concept-create.css';

const ConceptCosts = (props) => {
  const { incubationCost, breakEvenCost, breakEvenYear, willGMLeave, selectOption, updateFormField } = props;
  return (
    <div>
      <FormTextInput
        id="incubationCost"
        placeholder="Incubation cost"
        onChange={updateFormField}
        value={incubationCost}
      />
      <FormTextInput
        id="breakEvenCost"
        placeholder="Break-even cost"
        onChange={updateFormField}
        value={breakEvenCost}
      />
      <FormTextInput
        id="breakEvenYear"
        placeholder="Break-even year"
        onChange={updateFormField}
        value={breakEvenYear}
      />
      <SingleSelectBtnForm
        label="Would you (GM) leave DV?"
        options={[{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}]}
        selectedValue={willGMLeave}
        selectOption={selectOption}
        keyToUpdate='willGMLeave'
        title='Would you (GM) leave DV?'
      />
    </div>
  )
}

ConceptCosts.propTypes = {
  incubationCost: PropTypes.string,
  breakEvenCost: PropTypes.string,
  breakEvenYear: PropTypes.string,
  willGMLeave: PropTypes.string,
  selectOption: PropTypes.func,
  updateFormField: PropTypes.func
}

export default ConceptCosts;
