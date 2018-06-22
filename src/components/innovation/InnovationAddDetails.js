import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Uploader from '../Uploader';

import '../../styles/css/innovation-add-details.css';

const InnovationAddDetails = (props) => {
  const { innovationName, innovationLogo, updateInnovationName, updateInnovationLogo } = props;
  return (
    <div>
      <div className="innovation-add-details-row ">
        <input
          type="text"
          id="title"
          placeholder="Add innovation name"
          onChange={(e) => updateInnovationName('innovationName', e.target.value)}
          value={innovationName}
        />
      </div>
      <div className="innovation-add-logo-form">
        <Uploader logo={innovationLogo} />
      </div>
    </div>
  )
}

export default InnovationAddDetails;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
