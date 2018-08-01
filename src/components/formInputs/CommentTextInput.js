import React from 'react';
import PropTypes from 'prop-types';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/concept-finance-report-input.css'

const CommentTextInput = (props) => {
  const { id, placeholder, onChange, value, isRequired, emailValidation } = props;
  return (
    <div className="inventure-comment-input">
      {
        isRequired && !value &&
          <div className="inventure-comment-input-required-label">Required</div>
      }
      {
        emailValidation && value && !validateEmail(value) &&
          <div className="inventure-comment-input-invalid-email">Enter Valid Email</div>
      }
      <div className="inventure-comment-input-placeholder">
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

CommentTextInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  emailValidation: PropTypes.bool
}

export default CommentTextInput
