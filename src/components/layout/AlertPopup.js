import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/css/alert-popup.css';

const AlertPopup = (props) => {
  const { message } = props;
  if (!message) {
    return null
  } else {
    return (
      <div className="inventure-alert-temp-popup">
        <div className="inventure-alert-temp-popup-text">
          {message}
        </div>
      </div>
    )
  }
}

AlertPopup.propTypes = {
  message: PropTypes.string
}

const mapStateToProps = state => ({
  message: state.ui.message
});

export default connect(mapStateToProps, null)(AlertPopup);
