import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const InnovationAddTeam = (props) => {
  console.log('innovation add team props', props)
  return (
    <h1>Innovation Add Team</h1>
  )
}

export default InnovationAddTeam;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
