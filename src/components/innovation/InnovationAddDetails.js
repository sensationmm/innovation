import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Dropdown from '../formInputs/Dropdown.js';
import SingleSelectBtnForm from '../formInputs/SingleSelectBtnForm';
import FormTextInput from '../formInputs/FormTextInput';

import '../../styles/css/innovation-create.css';

import { innovationTypes } from '../../config/innovationOptions';

const InnovationAddDetails = (props) => {
  if (!props.dvOffices) {
    return null;
  } else {
    const {
      innovationName, dvOffice, dvPartner1, dvPartner2, teamGMEmail, innovationOpenDate, innovationDuration,
      toggleDatePicker, datePickerOpen, innovationType, updateFormField, selectOption, updateDateField, dvOffices
    } = props;

    const formattedOfficeOptions = dvOffices.map(dvOffice => ({ value: dvOffice.id, label: dvOffice.name }) )

    const requiredLabel = (<div className="create-innovation-required-label">Required</div>);
    return (
      <div>
        <SingleSelectBtnForm
          options={innovationTypes}
          selectedValue={innovationType}
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
          <div className="create-innovation-dropdown-input-title">Select DV office</div>
          <Dropdown
            id="dvOffice"
            value={dvOffice}
            options={formattedOfficeOptions}
            onChange={updateFormField}
            placeholder="Select DV office..."
            classes='create-innovation-dropdown'
          />
          {!dvOffice && requiredLabel}
        </div>
        <FormTextInput
          id="dvPartner1"
          placeholder="DV partner 1"
          onChange={updateFormField}
          value={dvPartner1}
          isRequired={true}
        />
        <FormTextInput
          id="dvPartner2"
          placeholder="DV partner 2"
          onChange={updateFormField}
          value={dvPartner2}
          isRequired={true}
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
          <div className="create-innovation-dropdown-input-title">Innovation Open Date</div>
          {!innovationOpenDate && requiredLabel}
          <div
            className="create-innovation-keydate-date"
            onClick={toggleDatePicker}
          >
            {(innovationOpenDate) ? moment(innovationOpenDate).format('DD/MM/YYYY') : 'Select Innovation Open Date'}
          </div>
          {datePickerOpen &&
            <div className="innovation-date-picker-mask">
              <DatePicker
                openToDate={innovationOpenDate ? innovationOpenDate : moment()}
                selected={innovationOpenDate ? innovationOpenDate : null}
                onChange={(newDate => { updateDateField(newDate); toggleDatePicker(); })}
                inline
              />
              <div className="innovation-date-picker-close" onClick={toggleDatePicker}>
                <i className="fas fa-times"></i>
              </div>
            </div>
          }
        </div>
        <FormTextInput
          id="innovationDuration"
          placeholder="Sprint duration (weeks)"
          onChange={updateFormField}
          value={innovationDuration}
          isRequired={true}
        />
      </div>
    )
  }
}

InnovationAddDetails.propTypes = {
  innovationName: PropTypes.string,
  dvOffice: PropTypes.string,
  dvPartner1: PropTypes.string,
  dvPartner2: PropTypes.string,
  innovationOpenDate: PropTypes.object,
  innovationDuration: PropTypes.string,
  toggleDatePicker: PropTypes.func,
  datePickerOpen: PropTypes.bool,
  innovationType: PropTypes.string,
  teamGMEmail: PropTypes.string,
  updateFormField: PropTypes.func,
  selectOption: PropTypes.func,
  updateDateField: PropTypes.func
}

const mapStateToProps = state => ({
  dvOffices: state.resources.dvOffices
});

export default connect(mapStateToProps, null)(InnovationAddDetails);
