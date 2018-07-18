import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../layout/FormTextInput';
import FormTextArea from '../layout/FormTextArea';
import Uploader from '../Uploader';

import '../../styles/css/concept-summary.css';

const ConceptSummary = (props) => {
  const { conceptName, conceptDescription, conceptLogo, updateFormField, updateConceptLogo } = props;
  return (
    <div>
      <FormTextInput
        id="conceptName"
        placeholder="Concept name"
        onChange={updateFormField}
        value={conceptName}
        isRequired={true}
      />
      <FormTextArea
        id="conceptDescription"
        placeholder="Concept description"
        onChange={updateFormField}
        value={conceptDescription}
      />
      <div className="concept-add-title-logo">
        <Uploader
          logo={conceptLogo}
          storeLogo={updateConceptLogo}
          messageText="Upload Concept Logo"
        />
      </div>
    </div>
  )
}

ConceptSummary.propTypes = {
  conceptName: PropTypes.string,
  conceptDescription: PropTypes.string,
  conceptLogo: PropTypes.object,
  updateFormField: PropTypes.func,
  updateConceptLogo: PropTypes.func
}

export default ConceptSummary;
