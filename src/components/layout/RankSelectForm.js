import React from 'react';
import classnames from 'classnames';

import '../../styles/css/rank-select-form.css'

const RankSelectForm = (props) => {
  const { keyToUpdate, rankRange, selectedValue, selectOption, isRequired, labels, title } = props;
  const options = [...Array(rankRange).keys()].map(key => {
    return {
      value: key + 1,
      label: (key + 1).toString()
    }
  })
  return (
    <div className="inventure-rank-select-form">
      {
        isRequired && !selectedValue &&
          <div className="inventure-rank-select-required-label">Required</div>
      }
      <div className="inventure-rank-select-title">{title}</div>
      <div className="inventure-rank-select-buttons-container">
        <div className="inventure-rank-select-label">{labels[0]}</div>
        {
          options.map(option => (
            <div
              key={`selectbutton-${option.value}`}
              className={classnames('inventure-rank-select-button', { 'selected-button': selectedValue === option.value })}
              onClick={() => selectOption(keyToUpdate, option.value)}
            >
              {option.label}
            </div>
          ))
        }
        <div className="inventure-rank-select-label">{labels[1]}</div>
      </div>
    </div>
  )
}

export default RankSelectForm;
