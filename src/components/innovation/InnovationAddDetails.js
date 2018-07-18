import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Dropdown from '../Dropdown';
import FormSelectButtons from '../layout/FormSelectButtons';
import FormTextInput from '../layout/FormTextInput';
import FormTextArea from '../layout/FormTextArea';
// import Uploader from '../Uploader';

import '../../styles/css/innovation-create.css';

import { innovationTypes, dvOfficeLocations } from '../../config/innovationOptions';

const InnovationAddDetails = (props) => {
  const {
    updateFormField, selectOption, updateDateField, innovationName, dvOffice, dvPartner1, dvPartner2, innovationOpenDate,
    innovationDuration, toggleDatePicker, datePickerOpen, innovationType, teamGMEmail
  } = props;
  const requiredLabel = (<div className="create-innovation-required-label">Required</div>);
  return (
    <div>
      <FormSelectButtons
        isMultiSelect={false}
        options={innovationTypes}
        selectedValues={innovationType}
        selectOption={selectOption}
        keyToUpdate='innovationType'
        isRequired={true}
        title='Innovation Type'
      />
      <FormTextInput
        id="innovationName"
        placeholder="Innovation name"
        onChange={updateFormField}
        value={innovationName}
        isRequired={true}
      />
      <div className="create-innovation-dropdown-container">
        <Dropdown
          id="dvOffice"
          value={dvOffice}
          options={dvOfficeLocations}
          onChange={updateFormField}
          placeholder="Select DV office..."
          classes='create-innovation-dropdown'
        />
      </div>
      <FormTextInput
        id="dvPartner1"
        placeholder="DV partner 1"
        onChange={updateFormField}
        value={dvPartner1}
      />
      <FormTextInput
        id="dvPartner2"
        placeholder="DV partner 2"
        onChange={updateFormField}
        value={dvPartner2}
      />
      <FormTextInput
        id="teamGMEmail"
        placeholder="Team GM Email"
        onChange={updateFormField}
        value={teamGMEmail}
        isRequired={true}
        emailValidation={true}
      />
      <div className="create-innovation-dropdown-container">
        {!innovationOpenDate && requiredLabel}
        <div
          className="create-innovation-keydate-date"
          onClick={toggleDatePicker}
        >
          {(innovationOpenDate) ? moment(innovationOpenDate).format('DD/MM/YYYY') : 'Select Innovation Open Date'}
        </div>
        {
          datePickerOpen &&
            <div className="innovation-date-picker-mask" onClick={toggleDatePicker}>
            <DatePicker
              openToDate={innovationOpenDate ? innovationOpenDate : moment()}
              selected={innovationOpenDate ? innovationOpenDate : null}
              onChange={(newDate => updateDateField(newDate))}
              inline
            />
            </div>
        }
      </div>
      <FormTextInput
        id="innovationDuration"
        placeholder="Expected Innovation Sprint duration (weeks)"
        onChange={updateFormField}
        value={innovationDuration}
      />
      {/* <div className="innovation-add-title-logo">
        <Uploader
          logo={innovationLogo}
          storeLogo={updateInnovationLogo}
          messageText="Upload Innovation Logo"
        />
      </div> */}
    </div>
  )
}

InnovationAddDetails.propTypes = {
  innovationName: PropTypes.string,
  innovationLogo: PropTypes.object,
  updateInnovationName: PropTypes.func,
  updateInnovationLogo: PropTypes.func
}

export default InnovationAddDetails;
