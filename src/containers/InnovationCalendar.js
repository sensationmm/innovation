import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Calendar from '../components/Calendar';

const InnovationCalendar = (props) => {

  const { innovations } = props;

  return (
    <div className="tracking">
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
