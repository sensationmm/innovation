import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CommentTextInput from './CommentTextInput';

import '../../styles/css/concept-finance-report-input.css'

const FinanceReportInput = (props) => {
  const { keyToUpdate, title, labels, selectedVaue, commentText, updateOption, updateComment, conceptId, isRequired } = props;
  return (
    <div className="finance-report-form-container">
      {
        isRequired && selectedVaue === null &&
          <div className="finance-report-form-required-label">Required</div>
      }
      <div className="finance-report-form-title">{title}</div>
      <div className="finance-report-form-buttons-container">
        {
          labels.map((label, index) => (
            <div key={`selectbutton-${label}`}>
              <div
                className={classnames('finance-report-form-button', { 'selected-button': selectedVaue === index })}
                onClick={() => updateOption(keyToUpdate, index, label, conceptId)}
              >
                {index}
              </div>
              <div className="finance-report-form-label">
                {label}
              </div>
            </div>
          ))
        }
      </div>
      <CommentTextInput
        id={keyToUpdate}
        placeholder="Comment"
        onChange={(e) => updateComment(keyToUpdate, e.target.value, conceptId)}
        value={commentText}
        isRequired={true}
      />
    </div>
  )
}

FinanceReportInput.propTypes = {
  keyToUpdate: PropTypes.string,
  conceptId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  labels: PropTypes.array,
  selectedVaue: PropTypes.number,
  commentText: PropTypes.string,
  updateOption: PropTypes.func,
  isRequired: PropTypes.bool,
  updateComment: PropTypes.func
}

export default FinanceReportInput;
