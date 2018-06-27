import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import '../../styles/css/innovation-add-dates.css';
import 'react-datepicker/dist/react-datepicker.css';

class InnovationKeyDate extends Component {
  state = {
    openDatePicker: false
  }
  render() {
    const { id, date, name, editKeyDate, deleteKeyDate, type } = this.props;
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
            <div className="innovation-delete-keydate" onClick={() => deleteKeyDate(id)}><i class="far fa-trash-alt innovation-delete-keydate-icon"></i></div>
        }
        {
          openDatePicker &&
            <div className="innovation-date-picker-mask" onClick={() => this.setState({ openDatePicker: false })}>
              <DatePicker
                openToDate={moment()}
                selected={date ? date : null}
                onChange={(e) => editKeyDate(id, 'date', e)}
                inline
                fixedHeight
                dateFormatCalendar={"MMM YYYY"}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
        }
      </div>
    )
  }
}

class InnovationAddDates extends Component {
  state = {
    openNewKeyDateForm: false,
    newCustomDateTitle: '',
    newCustomDateDate: null
  }

  render() {
    const { innovationKeyDates, deleteKeyDate, editKeyDate } = this.props;
    const { openNewKeyDateForm, newCustomDateTitle, newCustomDateDate } = this.state;
    return (
      <div>
        <div className="innovation-add-dates-header">
          <div className="innovation-add-dates-header-title">Enter Immersion Session Key Dates</div>
          <div className="innovation-add-dates-header-subtitle">These are required to create your innovation timeline, you can edit these later if required</div>
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
                <InnovationKeyDate
                  id={innovationKeyDates.length + 1}
                  name={newCustomDateTitle}
                  date={newCustomDateDate}
                  type="custom"
                  editKeyDate={editKeyDate}
                  deleteKeyDate={deleteKeyDate}
                />
                <div>
                  <span>Confirm</span>
                  <span>Cancel</span>
                </div>
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
