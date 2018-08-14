import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/inline-edit-text-input.css'

const InlineEditTextInput = (props) => {
  const { id, value, onChange, placeholder, hasChanged, saveToDb, textarea, inline } = props;
  return (
    <div className="inline-edit-text-input-container" style={{ display: inline ? 'inline-block' : 'auto' }}>
      <div className="inline-edit-text-input-field">
        {
          textarea
            ? (
              <textarea
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
              />
            )
            : (
              <input
                type="text"
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
              />
            )
        }
        {
          hasChanged &&
            <div className="inline-edit-text-input-save" onClick={() => saveToDb(id, value)}>Save</div>
        }
      </div>

    </div>
  )
}

InlineEditTextInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  hasChanged: PropTypes.bool,
  saveToDb: PropTypes.func,
  textarea: PropTypes.bool,
  inline: PropTypes.bool
}

export default InlineEditTextInput
