import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';

import '../../styles/css/innovation-create.css';

import { industries } from '../../config/innovationOptions';

const InnovationAddPartner = (props) => {
  const { updateFormField, partnerCCode, partnerName, partnerIndustry, partnerCity, partnerCountry, partnerDescription } = props;
  const requiredLabel = (<div className="create-innovation-required-label">Required</div>);
  return (
    <div>
      <div className="create-innovation-textinput">
        {!partnerCCode && requiredLabel}
        <input
          type="text"
          id="partnerCCode"
          placeholder="Corporate Partner's C-Code"
          onChange={updateFormField}
          value={partnerCCode}
        />
      </div>
      <div className="create-innovation-textinput">
        {!partnerName && requiredLabel}
        <input
          type="text"
          id="partnerName"
          placeholder="Corporate Partner's name"
          onChange={updateFormField}
          value={partnerName}
        />
      </div>
      <div className="create-innovation-dropdown-container">
        <Dropdown
          id="partnerIndustry"
          value={partnerIndustry}
          options={industries}
          onChange={updateFormField}
          placeholder="CPs industry..."
          classes='create-innovation-dropdown'
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="partnerCity"
          placeholder="Corporate Partner's city"
          onChange={updateFormField}
          value={partnerCity}
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="partnerCountry"
          placeholder="Corporate Partners country"
          onChange={updateFormField}
          value={partnerCountry}
        />
      </div>
      <div className="create-innovation-textinput">
        <textarea
          type="text"
          id="partnerDescription"
          placeholder="Corporate Partner business description"
          onChange={updateFormField}
          value={partnerDescription}
        />
      </div>
    </div>
  )
}

InnovationAddPartner.propTypes = {

}

export default InnovationAddPartner;
