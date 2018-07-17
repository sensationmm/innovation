import React from 'react';
import classnames from 'classnames';

import '../styles/css/select-buttons.css'

// Toggle option for multi select
// selectOption from single select

const SelectButtons = (props) => {
  const { keyToUpdate, options, selectedValues, isMultiSelect, toggleOption, selectOption } = props;
  return (
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
  )
}

SelectButtons.propTypes = {

}

export default SelectButtons;
