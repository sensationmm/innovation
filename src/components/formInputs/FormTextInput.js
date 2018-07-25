import React from 'react';
import PropTypes from 'prop-types';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/form-text-input.css'

const FormTextInput = (props) => {
  const { id, placeholder, onChange, value, isRequired, emailValidation } = props;
  return (
    <div className="inventure-form-textinput">
      {
        isRequired && !value &&
          <div className="inventure-form-textinput-required-label">Required</div>
      }
      {
        emailValidation && value && !validateEmail(value) &&
          <div className="inventure-form-textinput-invalid-email">Enter Valid Email</div>
      }
      <div className="inventure-form-textinput-placeholder">
        {placeholder}
      </div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

FormTextInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  emailValidation: PropTypes.bool
}

export default FormTextInput
