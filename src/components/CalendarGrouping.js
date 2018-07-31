import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../styles/css/calendar.css';

class CalendarGrouping extends Component {

  constructor() {
    super();

    this.state = {
      showDetails: true
    }
  }

  toggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {

    const { label, children } = this.props;
    const { showDetails } = this.state;

    return (
      <div className="calendar-grouping">
        <div className={classnames('calendar-grouping-label', { active: showDetails })} onClick={this.toggleDetails}>
          {label}
          <i className="fas fa-angle-down"></i>
        </div>
        {showDetails &&
          <div className={classnames('calendar-grouping-children', { active: showDetails })}>
            {children}
          </div>
        }
      </div>
    );
  }
}

CalendarGrouping.propTypes = {
  label: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default CalendarGrouping;
