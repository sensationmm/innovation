import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FormTextInput from './FormTextInput';

import '../../styles/css/concept-finance-report-input.css'

const FinanceReportInput = (props) => {
  const { keyToUpdate, title, labels, attrName, updateOption, updateComment, isRequired } = props;
  return (
    <div className="finance-report-form-container">
      {
        isRequired && !attrName.value &&
          <div className="finance-report-form-required-label">Required</div>
      }
      <div className="finance-report-form-title">{title}</div>
      <div className="finance-report-form-buttons-container">
        {
          labels.map((label, index) => (
            <div key={`selectbutton-${label}`}>
              <div
                className={classnames('finance-report-form-button', { 'selected-button': attrName.value === index })}
                onClick={() => updateOption(keyToUpdate, index, label)}
              >
                {index}
              </div>
              <div>
                {label}
              </div>
            </div>
          ))
        }
      </div>
      <FormTextInput
        id={keyToUpdate}
        placeholder={`${title} - comment`}
        onChange={(e) => updateComment(keyToUpdate, e.target.value)}
        value={attrName.comment}
        isRequired={true}
      />
    </div>
  )
}

FinanceReportInput.propTypes = {
  keyToUpdate: PropTypes.string,
  title: PropTypes.string,
  labels: PropTypes.array,
  attrName: PropTypes.object,
  updateOption: PropTypes.func,
  isRequired: PropTypes.bool,
  updateComment: PropTypes.func
}

export default FinanceReportInput;
