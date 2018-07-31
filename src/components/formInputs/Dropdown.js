import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/dropdown.css';

/**
 * Dropdown
 *
 * Renders a styled form select
 *
 * @param {string} id - typically used to target state item in parent
 * @param {integer|string} value - selected value
 * @param {array} options - array of { value: 'value', label: 'label' } pairs to represent id/value for select options
 * @param {function} onChange - callback function when new option selected
 * @param {string} placeholder - placeholder text to default to onload (optional)
 * @param {string} classes - addtional css classes to pass to wrapper
 * @param {string} colors - ??
 */

const Dropdown = (props) => {
  const { colors, id, value, options, onChange, classes, placeholder } = props;
  const elStyle = {};

  if (colors !== undefined) {
    elStyle.color = 'white';
    elStyle.backgroundColor = colors[value];
    elStyle.backgroundImage = 'linear-gradient(45deg, transparent 50%, #fff 50%), linear-gradient(135deg, #fff 50%, transparent 50%)';
  }

  return (
    <div className={`dropdown ${classes}`}>
      <select id={id} value={value} onChange={onChange} style={elStyle}>
        {
          placeholder &&
            <option value="">{placeholder}</option>
        }
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  colors: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  id: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  classes: PropTypes.string
};

export default Dropdown;
