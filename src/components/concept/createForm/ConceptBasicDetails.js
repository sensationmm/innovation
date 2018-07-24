import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../../layout/FormTextInput';
import FormTextArea from '../../layout/FormTextArea';
import Uploader from '../../Uploader';

import '../../../styles/css/concept-create.css';

const ConceptBasicDetails = (props) => {
  const { name, description, logo, updateFormField, updateConceptLogo } = props;
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
        />
      </div>
    </div>
  )
}

ConceptBasicDetails.propTypes = {
  conceptName: PropTypes.string,
  conceptDescription: PropTypes.string,
  conceptLogo: PropTypes.object,
  updateFormField: PropTypes.func,
  updateConceptLogo: PropTypes.func
}

export default ConceptBasicDetails;
