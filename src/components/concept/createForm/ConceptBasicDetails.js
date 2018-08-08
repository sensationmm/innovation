import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../../formInputs/FormTextInput.js';
import FormTextArea from '../../formInputs/FormTextArea';
import Uploader from '../../formInputs/Uploader.js';
import FormRow from '../../layout/FormRow.js';

import '../../../styles/css/concept-create.css';

const ConceptBasicDetails = (props) => {
  const { name, description, logo, updateFormField, updateConceptLogo, existingLogo, canvases, addCanvas } = props;

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

      <FormRow label="Concept Logo">
        <Uploader
          logo={logo}
          storeLogo={updateConceptLogo}
          messageText={existingLogo ? 'Replace' : 'Upload'}
          existingLogo={existingLogo}
          multiple={false}
        />
      </FormRow>

      <FormRow label="Idea Canvases">
        <Uploader
          logo={canvases}
          storeLogo={addCanvas}
          messageText="Upload"
          existingLogo={existingLogo}
          multiple={true}
          viewable={true}
        />
      </FormRow>
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
  canvases: PropTypes.array,
  updateFormField: PropTypes.func,
  updateConceptLogo: PropTypes.func,
  addCanvas: PropTypes.func,
  existingLogo: PropTypes.bool
}

export default ConceptBasicDetails;
