import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/css/form-select-buttons.css'

// Toggle option for multi select
// selectOption from single select
// Default for selectedValues should be an empty array

const SingleSelectBtnForm = (props) => {
  const { keyToUpdate, options, selectedValue, selectOption, isRequired, title } = props;
  return (
    <div className="inventure-select-button-input">
      {
        isRequired && !selectedValue &&
          <div className="inventure-select-buttons-required-label">Required</div>
      }
      <div className="inventure-select-buttons-title">{title}</div>
      <div className="inventure-select-buttons-container">
        {
          options.map(option => (
            <div
              key={`selectbutton-${option.value}`}
              className={classnames('inventure-select-button', { 'selected-button': selectedValue === option.value })}
              onClick={() => selectOption(keyToUpdate, option.value)}
            >
              {option.label}
            </div>
          ))
        }
      </div>
    </div>
  )
}

SingleSelectBtnForm.propTypes = {
  keyToUpdate: PropTypes.string,
  options: PropTypes.array,
  selectedValue: PropTypes.string,
  selectOption: PropTypes.func,
  isRequired: PropTypes.bool,
  title: PropTypes.string
}

export default SingleSelectBtnForm;
