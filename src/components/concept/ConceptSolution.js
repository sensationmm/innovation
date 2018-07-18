import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../layout/FormTextInput';
import FormTextArea from '../layout/FormTextArea';

import '../../styles/css/concept-create.css';

const ConceptSolution = (props) => {
  const { solutionDescription, primaryTechnology, successFactors, keyRisks, updateFormField } = props;
  return (
    <div>
      <FormTextArea
        id="solutionDescription"
        placeholder="Describe Solution"
        onChange={updateFormField}
        value={solutionDescription}
      />
      <FormTextInput
        id="primaryTechnology"
        placeholder="Primary Technology"
        onChange={updateFormField}
        value={primaryTechnology}
      />
      <FormTextInput
        id="successFactors"
        placeholder="Critical Success Factors"
        onChange={updateFormField}
        value={successFactors}
      />
      <FormTextInput
        id="keyRisks"
        placeholder="Key Risks"
        onChange={updateFormField}
        value={keyRisks}
      />
    </div>
  )
}

ConceptSolution.propTypes = {
  solutionDescription: PropTypes.string,
  primaryTechnology: PropTypes.string,
  successFactors: PropTypes.string,
  keyRisks: PropTypes.string,
  updateFormField: PropTypes.func
}

export default ConceptSolution;
