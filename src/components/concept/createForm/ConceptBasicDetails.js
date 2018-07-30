import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../../formInputs/FormTextInput.js';
import FormTextArea from '../../formInputs/FormTextArea';
import Uploader from '../../formInputs/Uploader.js';

import '../../../styles/css/concept-create.css';

const ConceptBasicDetails = (props) => {
  const { name, description, logo, updateFormField, updateConceptLogo, existingLogo } = props;
  return (
    <div>
      <FormTextInput
        id="name"
        placeholder="Concept name"
        onChange={updateFormField}
        value={name}
        isRequired={true}
      />
      <FormTextArea
        id="description"
        placeholder="Concept description"
        onChange={updateFormField}
        value={description}
      />
      <div className="concept-add-title-logo">
        <Uploader
          logo={logo}
          storeLogo={updateConceptLogo}
          messageText="Upload Concept Logo"
          existingLogo={existingLogo}
        />
      </div>
    </div>
  )
}

ConceptBasicDetails.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  updateFormField: PropTypes.func,
  updateConceptLogo: PropTypes.func,
  existingLogo: PropTypes.bool
}

export default ConceptBasicDetails;
