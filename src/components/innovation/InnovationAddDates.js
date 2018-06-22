import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const InnovationAddDates = (props) => {
  console.log('innovation add dates props', props)
  return (
    <h1>Innovation Add Dates</h1>
  )
}

export default InnovationAddDates;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
