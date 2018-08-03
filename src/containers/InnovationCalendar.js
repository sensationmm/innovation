import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Calendar from '../components/calendar/Calendar';
import ButtonSubmit from '../components/buttons/ButtonSubmit';

import { requestInnovationReport } from '../actions/innovations';

const InnovationCalendar = (props) => {

  const { innovations } = props;

  return (
    <div className="tracking">
      <div className="innovation-dash-header">
        <div className="innovation-dash-calendar-report-button">
          <ButtonSubmit
            onClick={() => props.requestInnovationReport('calendar')}
            label="Request Report Email"
          />
        </div>
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
  innovations: PropTypes.array,
  requestInnovationReport: PropTypes.func
};

const mapStateToProps = state => ({
  innovations: state.innovations.allInnovationsList
});

const actions = { requestInnovationReport };

export default connect(mapStateToProps, actions)(InnovationCalendar);
