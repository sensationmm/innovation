import React from 'react';
import classnames from 'classnames';

import '../../styles/css/form-select-buttons.css'

// Toggle option for multi select
// selectOption from single select
// Default for selectedValues should be an empty array

const FormSelectButtons = (props) => {
  const { keyToUpdate, options, selectedValues, isMultiSelect, toggleOption, selectOption, isRequired, title } = props;
  return (
    <div className="inventure-select-button-input">
      {
        isRequired && !selectedValues.length > 0 &&
          <div className="inventure-select-buttons-required-label">Required</div>
      }
      <div className="inventure-select-buttons-title">{title}</div>
      <div className="inventure-select-buttons-container">
        {
          options.map(option => (
            <div
              key={`selectbutton-${option.value}`}
              className={classnames('inventure-select-button', { 'selected-button': selectedValues.includes(option.value)})}
              onClick={isMultiSelect ? () => toggleOption(keyToUpdate, option.value) : () => selectOption(keyToUpdate, option.value)}
            >
              {option.label}
            </div>
          ))
        }
      </div>
    </div>
  )
}

FormSelectButtons.propTypes = {

}

export default FormSelectButtons;
