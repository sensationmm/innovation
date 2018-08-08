import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/form-text-input.css'

/**
* FormRow
*
* Wrapper component to display a form row
*
* @param {element|array} children - any HTML/React components to display as the content
* @param {boolean} isRequired - input is required before form submission
* @param {string} label - row label
*/

const FormRow = props => {
  const { children, isRequired, label } = props;

  return (
    <div className="inventure-form-textinput">
      {isRequired &&
        <div className="inventure-form-textinput-required-label">Required</div>
      }
      <div className="inventure-form-textinput-placeholder">
        {label}
      </div>
      <div className="inventure-form-content">
        {children}
      </div>
    </div>
  );
};

FormRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string
};

FormRow.defaultProps = {
  isRequired: false
};

export default FormRow;
