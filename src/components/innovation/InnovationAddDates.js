import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/css/innovation-add-dates.css';

class RequiredInnovationKeyDate extends Component {
  state = {
    openDatePicker: false
  }
  render() {
    const { id, date, name, editKeyDate } = this.props;
    const { openDatePicker } = this.state;
    return (
      <div className="innovation-keydate">
        <div className="innovation-keydate-name">{name}</div>
        <div className="innovation-keydate-date" onClick={() => this.setState({ openDatePicker: !openDatePicker })}>
          {(date) ? moment(date).format('DD/MM/YYYY') : 'Enter date'}
        </div>
        {
          openDatePicker &&
          <div>
            <DatePicker
              id="date-to"
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
            <div className="innovation-date-picker-mask" onClick={() => this.setState({ openDatePicker: !openDatePicker })}></div>
          </div>
        }
      </div>
    )
  }
}

class CustomInnovationKeyDate extends Component {
  state = {
    openDatePicker: false
  }
  render() {
    const { keyDateId, date, name, editKeyDate  } = this.props;
    const { openDatePicker } = this.state;
    return (
      <div>Custom Key Dates</div>
    )
  }
}

class InnovationAddDates extends Component {
  state = {

  }

  render() {
    const { requiredKeyDates, innovationKeyDates, editKeyDate } = this.props;
    return (
      <div>
        <div className="innovation-add-dates-header">
          <div className="innovation-add-dates-header-title">Enter Immersion Session Key Dates</div>
          <div className="innovation-add-dates-header-subtitle">These are required to create your innovation timeline, you can edit these later if required</div>
        </div>
        <div className="innovation-keydates-container">
          {
            requiredKeyDates.map(({ id, name, date }) => (
              <RequiredInnovationKeyDate
                key={id}
                id={id}
                name={name}
                date={date}
                editKeyDate={editKeyDate}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default InnovationAddDates;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
