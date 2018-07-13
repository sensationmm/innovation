import React from 'react';
import PropTypes from 'prop-types';

import '../styles/css/user-progress-indicator.css';

const UserProgressIndicator = (props) => {
  const { totalSteps, activeStep } = props;
  return (
    <div className="process-step-count-container">
      {
        [...Array(totalSteps).keys()].map((step) => (
          <div key={`user-progress-step-${step+1}`}
            className={activeStep === step+1 ? 'process-step-count active' : 'process-step-count'}>
            {step+1}
          </div>
        ))
      }
    </div>
  )
}

UserProgressIndicator.propTypes = {
  totalSteps: PropTypes.number,
  activeStep: PropTypes.number
}

export default UserProgressIndicator;