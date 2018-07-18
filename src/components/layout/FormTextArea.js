import React from 'react';
import classnames from 'classnames';

import '../../styles/css/form-text-input.css'

const FormTextArea = (props) => {
  const { id, placeholder, onChange, value, isRequired } = props;
  return (
    <div className="inventure-form-textinput">
      {
        isRequired && !value &&
          <div className="inventure-form-textinput-required-label">Required</div>
      }
      <div
        className={classnames('inventure-form-textinput-placeholder', { 'disabled': !value }, { 'active': value })}>
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

export default FormTextArea
