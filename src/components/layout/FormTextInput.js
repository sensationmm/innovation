import React from 'react';
import classnames from 'classnames';

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
      <div
        className={classnames('inventure-form-textinput-placeholder', { 'disabled': !value }, { 'active': value })}>
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

export default FormTextInput
