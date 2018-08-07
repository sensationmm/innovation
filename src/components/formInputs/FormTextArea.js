import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/form-text-input.css'

const FormTextArea = (props) => {
  const { id, placeholder, onChange, value, isRequired, labelLeftAlign } = props;
  return (
    <div className="inventure-form-textinput">
      {
        isRequired && !value &&
          <div className="inventure-form-textinput-required-label">Required</div>
      }
      <div className="inventure-form-textinput-placeholder" style={{ left: labelLeftAlign ? '0px' : '12px' }}>
        {placeholder}
      </div>
      <textarea
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

FormTextArea.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  labelLeftAlign: PropTypes.bool
}

export default FormTextArea
