import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classnames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/css/innovation-add-dates.css';

class InnovationKeyDate extends Component {
  state = {
    openDatePicker: false
  }
  handleEditKeyDate = (newDate) => {
    const { id, editKeyDate } = this.props;
    editKeyDate(id, 'date', newDate)
    this.setState({ openDatePicker: false });
  }
  render() {
    const { id, date, name, deleteKeyDate, type } = this.props;
    const { openDatePicker } = this.state;
    return (
      <div className="innovation-keydate">
        <div className="innovation-keydate-name">{name}</div>
        <div className="innovation-keydate-date" onClick={() => this.setState({ openDatePicker: !openDatePicker })}>
          {(date) ? moment(date).format('DD/MM/YYYY') : 'Enter date'}
        </div>
        {
          type === 'required' &&
            <div className="innovation-is-required">Required</div>
        }
        {
          type === 'custom' &&
            <div className="innovation-delete-keydate" onClick={() => deleteKeyDate(id)}><i className="far fa-trash-alt innovation-delete-keydate-icon"></i></div>
        }
        {
          openDatePicker &&
            <div className="innovation-date-picker-mask">
              <DatePicker
                openToDate={date ? date : moment()}
                selected={date ? date : null}
                onChange={(newDate) => this.handleEditKeyDate(newDate)}
                inline
              />
            </div>
        }
      </div>
    )
  }
}

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
              <div className="innovation-date-picker-mask" onClick={() => this.setState({ openDatePicker: false })}>
              <DatePicker
                openToDate={newCustomDate ? newCustomDate : moment()}
                selected={newCustomDate ? newCustomDate : null}
                onChange={(e) => this.onChange('newCustomDate', e)}
                inline
              />
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

class InnovationAddDates extends Component {
  state = {
    openNewKeyDateForm: false
  }

  toggleFormOpen = () => {
    this.setState({ openNewKeyDateForm: !this.state.openNewKeyDateForm })
  }

  render() {
    const { innovationKeyDates, deleteKeyDate, editKeyDate, createNewKeyDate } = this.props;
    const { openNewKeyDateForm } = this.state;
    return (
      <div>
        <div className="innovation-add-dates-header">
          <div className="innovation-add-dates-header-title">Enter Immersion Session Key Dates</div>
          <div className="innovation-add-dates-header-subtitle">These are required to create your innovation timeline, you can edit these later if you need to</div>
        </div>
        <div className="innovation-keydates-container">
          <div className="innovation-keydates">
            {
              innovationKeyDates.map(({ id, name, date, type }) => (
                                          <InnovationKeyDate
                                            key={id}
                                            id={id}
                                            name={name}
                                            date={date}
                                            type={type}
                                            editKeyDate={editKeyDate}
                                            deleteKeyDate={deleteKeyDate}
                                          />
                                        ))
            }
          </div>
        </div>
        {
          openNewKeyDateForm
            ? (
              <div className="innovation-add-keydate-form">
                <AddNewKeyDateForm
                  createNewKeyDate={createNewKeyDate}
                  toggleFormOpen={() => this.setState({ openNewKeyDateForm: false })}
                  newId={innovationKeyDates.length + 1}
                  toggleForm={this.toggleForm}
                />
              </div>
            )
            : (
              <div onClick={() => this.setState({ openNewKeyDateForm: true })} className="innovation-add-keydate">
                <div className="innovation-add-keydate-icon-container">
                  <i className="fa fa-plus add-new-keydate-icon"></i>
              </div>
                <div className="innovation-add-keydate-text">Add additional custom dates</div>
              </div>
            )
        }
      </div>
    )
  }
}

export default InnovationAddDates;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
