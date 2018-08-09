import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/text-input-filter-select.css'

const TextInputFilterSelect = (props) => {
  const { id, value, onChange, title, placeholder, selectableList, isRequired, emailValidation } = props;
  const filteredList = selectableList.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) >= 0 && item !== value)
  return (
    <div className="form-textinput-filter-select">
      {
        isRequired && !value &&
          <div className="form-textinput-filter-select-required-label">Required</div>
      }
      {
        emailValidation && value && !validateEmail(value) &&
          <div className="form-textinput-filter-select-invalid-email">Enter Valid Email</div>
      }

      <div className="form-textinput-filter-select-placeholder">
        {title}
      </div>

      <div className="form-textinput-filter-select-input">
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {
          filteredList && filteredList.length > 0 &&
            <div className={classnames('form-textinput-filter-select-selectable', { 'hidden': value.length < 2 })}>
              {
                filteredList.map(availableItem => {
                  return (
                    <div
                      key={`list-${availableItem}`}
                      onClick={() => onChange({ target: { id: id, value: availableItem } })}
                      className='form-textinput-filter-select-list-item'
                    >
                      <i className="fas fa-plus form-textinput-filter-select-list-item-add-icon"></i>
                      <span className="form-textinput-filter-select-list-display">{availableItem}</span>
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  )
}

TextInputFilterSelect.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  selectableList: PropTypes.array,
  emailValidation: PropTypes.bool,
  isRequired: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string
}

export default TextInputFilterSelect;
