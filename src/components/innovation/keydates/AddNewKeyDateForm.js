import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classnames from 'classnames';

import '../../../styles/css/innovation-add-dates.css';

class AddNewKeyDateForm extends Component {
  state = {
    openDatePicker: false,
    newCustomTitle: '',
    newCustomDate: null,
    canSubmit: false,
    incompleteSubmission: false,
    missingFields: []
  }

  onChange = (key, value) => {
    const { missingFields } = this.state;
    const newMissingFields = missingFields.filter(field => field !== key);
    this.setState({ [key]: value, missingFields: newMissingFields })
    if (key === 'newCustomDate') {
      this.setState({ openDatePicker: false })
    }
  }

  handleCreateNewKeyDate = () => {
    const { newCustomTitle, newCustomDate} = this.state;
    if (!newCustomTitle || !newCustomDate) {
      const missingFields = [];
      if (!newCustomTitle) { missingFields.push('newCustomTitle') }
      if (!newCustomDate) { missingFields.push('newCustomDate') }
      this.setState({ incompleteSubmission: true, missingFields })
    } else {
    const { newId, createNewKeyDate, toggleFormOpen } = this.props;
      createNewKeyDate(newId, newCustomTitle, newCustomDate);
      toggleFormOpen()
      this.setState({
        openDatePicker: false,
        newCustomTitle: '',
        newCustomDate: null,
        incompleteSubmission: false,
        missingFields: []
      })
    }
  }
  render() {
    const { toggleFormOpen } = this.props;
    const { openDatePicker, newCustomTitle, newCustomDate, missingFields } = this.state;
    return (
      <div>
        <div className="innovation-keydate">
          <input
            className={classnames('add-new-keydate-form-input', {'highlight-missing-info': missingFields.includes('newCustomTitle')})}
            type="text"
            value={newCustomTitle}
            placeholder="Enter Key Event"
            onChange={(e) => this.onChange('newCustomTitle', e.target.value)}
          />
          <div
            className={classnames('innovation-keydate-date', {'highlight-missing-info': missingFields.includes('newCustomDate')})}
            onClick={() => this.setState({ openDatePicker: !openDatePicker })}
          >
            {(newCustomDate) ? moment(newCustomDate).format('DD/MM/YYYY') : 'Enter date'}
          </div>
          {
            openDatePicker &&
            <div>
              <div className="innovation-date-picker-mask">
                <DatePicker
                  openToDate={newCustomDate ? newCustomDate : moment()}
                  selected={newCustomDate ? newCustomDate : null}
                  onChange={(e) => this.onChange('newCustomDate', e)}
                  inline
                  fixedHeight
                />
                <div className="innovation-date-picker-close" onClick={() => this.setState({ openDatePicker: false })}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
            </div>
          }
          <span className="add-new-keydate-actions confirm" onClick={this.handleCreateNewKeyDate}>Confirm</span>
          <span className="add-new-keydate-actions cancel" onClick={() => toggleFormOpen()}>Cancel</span>
        </div>
      </div>
    )
  }
}

AddNewKeyDateForm.propTypes = {
  newId: PropTypes.number,
  createNewKeyDate: PropTypes.func,
  toggleFormOpen: PropTypes.func
}

export default AddNewKeyDateForm;
