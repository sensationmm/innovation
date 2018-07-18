import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';
import FormTextInput from '../layout/FormTextInput';
import FormTextArea from '../layout/FormTextArea';

import '../../styles/css/innovation-create.css';

import { industries } from '../../config/innovationOptions';

const InnovationAddPartner = (props) => {
  const { updateFormField, partnerCCode, partnerName, partnerIndustry, partnerCity, partnerCountry, partnerDescription } = props;
  const requiredLabel = (<div className="create-innovation-required-label">Required</div>);
  return (
    <div>
      <FormTextInput
        id="partnerCCode"
        placeholder="Corporate Partner's C-Code"
        onChange={updateFormField}
        value={partnerCCode}
        isRequired={true}
      />
      <FormTextInput
        id="partnerName"
        placeholder="Corporate Partner's name"
        onChange={updateFormField}
        value={partnerName}
        isRequired={true}
      />
      <div className="create-innovation-dropdown-container">
        <Dropdown
          id="partnerIndustry"
          value={partnerIndustry}
          options={industries}
          onChange={updateFormField}
          placeholder="Select CPs industry..."
          classes='create-innovation-dropdown'
        />
      </div>
      <FormTextInput
        id="partnerCity"
        placeholder="Corporate Partner's city"
        onChange={updateFormField}
        value={partnerCity}
      />
      <FormTextInput
        id="partnerCountry"
        placeholder="Corporate Partners country"
        onChange={updateFormField}
        value={partnerCountry}
      />
      <FormTextArea
        id="partnerDescription"
        placeholder="CP business description"
        onChange={updateFormField}
        value={partnerDescription}
      />
    </div>
  )
}

InnovationAddPartner.propTypes = {

}

export default InnovationAddPartner;
