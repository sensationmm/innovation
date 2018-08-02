import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/css/loader.css';

const Loader = (props) => {
  if (!props.isLoading) {
    return false;
  }

  return (
    <div className="loader">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
});

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Loader);
