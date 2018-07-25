import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from '../formInputs/Dropdown';
import FormTextInput from '../formInputs/FormTextInput';
import FormTextArea from '../formInputs/FormTextArea';

import '../../styles/css/innovation-create.css';

const InnovationAddPartner = (props) => {
  if (!props.industries) {
    return null;
  } else {
    const {
      partnerCCode, partnerName, partnerIndustry, partnerCity, partnerCountry, partnerDescription, updateFormField, industries
    } = props;

    const formatedIndustryOptions = industries && industries.map(industry => ({ value: industry.id, label: industry.name }) );

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
          <div className="create-innovation-dropdown-input-title">Select CP’s Industry</div>
          <Dropdown
            id="partnerIndustry"
            value={partnerIndustry}
            options={formatedIndustryOptions}
            onChange={updateFormField}
            placeholder="Select CPs industry..."
            classes='create-innovation-dropdown'
          />
          {!partnerIndustry && requiredLabel}
        </div>
        <FormTextInput
          id="partnerCity"
          placeholder="Corporate Partner's city"
          onChange={updateFormField}
          value={partnerCity}
          isRequired={true}
        />
        <FormTextInput
          id="partnerCountry"
          placeholder="Corporate Partners country"
          onChange={updateFormField}
          value={partnerCountry}
          isRequired={true}
        />
        <FormTextArea
          id="partnerDescription"
          placeholder="CP business description"
          onChange={updateFormField}
          value={partnerDescription}
          isRequired={true}
        />
      </div>
    )
  }
}

InnovationAddPartner.propTypes = {
  partnerCCode: PropTypes.string,
  partnerName: PropTypes.string,
  partnerIndustry: PropTypes.string,
  partnerCity: PropTypes.string,
  partnerCountry: PropTypes.string,
  partnerDescription: PropTypes.string,
  updateFormField: PropTypes.func
}

const mapStateToProps = state => ({
  industries: state.resources.industries
});

export default connect(mapStateToProps, null)(InnovationAddPartner);
