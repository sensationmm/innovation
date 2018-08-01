import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Calendar from '../components/Calendar';

const InnovationCalendar = (props) => {

  const { innovations } = props;

  return (
    <div className="tracking">
      <div className="innovation-dash-header">
        <div>Innovation Calendar</div>

        <div className="innovation-dash-view">
          <NavLink to="/dashboard" activeClassName="active"><i className="fas fa-list-ul"></i></NavLink>
          <NavLink to="/innovation-calendar" activeClassName="active"><i className="fas fa-calendar-alt"></i></NavLink>
        </div>
      </div>

      <Calendar innovations={innovations} />
    </div>
  );
}

InnovationCalendar.propTypes = {
  innovations: PropTypes.array
};

const mapStateToProps = state => ({
  innovations: state.innovations.allInnovationsList
});

export default connect(mapStateToProps, null)(InnovationCalendar);
