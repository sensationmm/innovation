import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';

const InnovationAddPartner = (props) => {
  const { updateFormField, partnerCCode, partnerName, partnerIndustry, partnerCity, partnerCountry, partnerDescription } = props;
  return (
    <div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="partnerCCode"
          placeholder="Enter Corporate Partner's C-Code"
          onChange={updateFormField}
          value={partnerCCode}
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="partnerName"
          placeholder="Enter Corporate Partner's name"
          onChange={updateFormField}
          value={partnerName}
        />
      </div>
      <div className="create-innovation-dropdown-container">
        <Dropdown
          id="partnerIndustry"
          value={partnerIndustry}
          options={[{value: 'energy', label: 'Energy'},{value: 'finance', label: 'Finance'},{value: 'health', label: 'Health'}]}
          onChange={updateFormField}
          placeholder="Select CPs industry..."
          classes='create-innovation-dropdown'
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="partnerCity"
          placeholder="Enter Corporate Partner's city"
          onChange={updateFormField}
          value={partnerCity}
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="partnerCountry"
          placeholder="Enter Corporate Partner country"
          onChange={updateFormField}
          value={partnerCountry}
        />
      </div>
      <div className="create-innovation-textinput">
        <textarea
          type="text"
          id="partnerDescription"
          placeholder="Enter a brief description CPs business"
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
