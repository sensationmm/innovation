import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classnames from 'classnames';

import Dropdown from '../Dropdown';
// import Uploader from '../Uploader';

const InnovationAddDetails = (props) => {
  const {
    updateFormField, innovationName, dvOffice, dvPartner1, dvPartner2, innovationOpenDate,
    innovationDuration, toggleDatePicker, datePickerOpen
  } = props;
  return (
    <div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="innovationName"
          placeholder="Enter innovation name"
          onChange={updateFormField}
          value={innovationName}
        />
      </div>
      <div className="create-innovation-dropdown-container">
        <Dropdown
          id="dvOffice"
          value={dvOffice}
          options={[{value: 'london', label: 'London'},{value: 'sydney', label: 'Sydney'},{value: 'manhattan', label: 'Manhattan'}]}
          onChange={updateFormField}
          placeholder="Select DV office..."
          classes='create-innovation-dropdown'
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="dvPartner1"
          placeholder="Enter DV partner 1"
          onChange={updateFormField}
          value={dvPartner1}
        />
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="dvPartner2"
          placeholder="Enter DV partner 2"
          onChange={updateFormField}
          value={dvPartner2}
        />
      </div>
      <div className="create-innovation-dropdown-container">
        <div
          className={classnames('innovation-keydate-date')}
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
              onChange={updateFormField}
              inline
            />
            </div>
        }
      </div>
      <div className="create-innovation-textinput">
        <input
          type="text"
          id="innovationDuration"
          placeholder="Enter expected Innovation Sprint duration"
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
