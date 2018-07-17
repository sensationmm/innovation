import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Dropdown from '../Dropdown';
import SelectButtons from '../SelectButtons';
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
      <div className="create-innovation-textinput">
        {!innovationType && requiredLabel}
        <SelectButtons
          isMultiSelect={false}
          options={innovationTypes}
          selectedValues={[innovationType]}
          selectOption={selectOption}
          keyToUpdate='innovationType'
        />
      </div>
      {/* <div className="create-innovation-dropdown-container">
        <Dropdown
          id="innovationType"
          value={innovationType}
          options={innovationTypes}
          onChange={updateFormField}
          placeholder="Innovation Type"
          classes='create-innovation-dropdown'
        />
      </div> */}
      <div className="create-innovation-textinput">
        {!innovationName && requiredLabel}
        <input
          type="text"
          id="innovationName"
          placeholder="Innovation name"
          onChange={updateFormField}
          value={innovationName}
        />
      </div>
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
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="dvPartner1"
          placeholder="DV partner 1"
          onChange={updateFormField}
          value={dvPartner1}
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="dvPartner2"
          placeholder="DV partner 2"
          onChange={updateFormField}
          value={dvPartner2}
        />
      </div>
      <div className="create-innovation-textinput">
        {!teamGMEmail && requiredLabel}
        <input
          type="text"
          id="teamGMEmail"
          placeholder="Team GM Email"
          onChange={updateFormField}
          value={teamGMEmail}
        />
      </div>
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
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="innovationDuration"
          placeholder="Expected Innovation Sprint duration"
          onChange={updateFormField}
          value={innovationDuration}
        />
      </div>
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
