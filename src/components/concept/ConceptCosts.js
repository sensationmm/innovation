import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../layout/FormTextInput';
import FormSelectButtons from '../layout/FormSelectButtons';

import '../../styles/css/concept-create.css';

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
      <FormSelectButtons
        label="Would you (GM) leave DV?"
        isMultiSelect={false}
        options={[{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}]}
        selectedValues={willGMLeave}
        selectOption={selectOption}
        keyToUpdate='willGMLeave'
        title='Would you (GM) leave DV?'
      />
    </div>
  )
}

ConceptCosts.propTypes = {

}

export default ConceptCosts;
