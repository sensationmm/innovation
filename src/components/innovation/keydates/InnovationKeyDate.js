import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/css/innovation-add-dates.css';

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

InnovationKeyDate.propTypes = {
  id: PropTypes.number,
  editKeyDate: PropTypes.func,
  date: PropTypes.object,
  name: PropTypes.string,
  deleteKeyDate: PropTypes.func,
  type: PropTypes.string
}

export default InnovationKeyDate
