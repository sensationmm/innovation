import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ContentBox from '../../components/layout/ContentBox';

import '../../styles/css/concept-add-attributes.css';

// TODO: Get from API, from Innovation data or from client config.
const availableOppAreas = [
  {id: 1, name: 'Area 1'}, {id: 2, name: 'Area 2'}, {id: 3, name: 'Area 3'}, {id: 4, name: 'Area 4'}
]
const availableDvMatrix = [
  {id: 1, name: 'Digital Attacker'}, {id: 2, name: 'Re-Engineer'}, {id: 3, name: 'Re-Imagine'}, {id: 4, name: 'New Business'}
];
const availableKeyTech = [
  {id: 1, name: 'Blockchain'}, {id: 2, name: 'IoT'}, {id: 3, name: 'ML'}, {id: 4, name: 'AI'}
];
const availableArchetypes = [
  {id: 1, name: 'Marketplace'}, {id: 2, name: 'Arch 2'}, {id: 3, name: 'Arch 3'}, {id: 4, name: 'Arch 4'}
];


class ConceptAddAttributes extends Component {
  /**
  * @param {string} optionType - the name of the options (e.g. Opportunity Areas) - or use a key / id when you have one from API
  * @param {array {id,name}} availableOptionsArray
   * @param {array [int]} selectedValueIds - either an array of ids or a single id value
   * @param {string} inputType - either single select 'radio' or multi-select 'checkbox'
   */
  createOptions = (optionType, availableOptionsArray, selectedValueIds, inputType) => {
    const { updateAttributeArray, updateAttributeValue } = this.props
    return availableOptionsArray.map(option => {
      const { id, name } = option;
      const isSelected = Array.isArray(selectedValueIds) ? selectedValueIds.includes(id) : selectedValueIds === id;
      return (
        <div className="concept-add-attributes-option-container" key={`${id}-${name}`}>
            <input
              className={
                classnames('concept-add-attributes-option-input', {'radio': inputType === 'radio'}, {'checkbox': inputType === 'checkbox'})
              }
              type={inputType === 'radio' ? "radio" : "checkbox"}
              name={id}
              id={id}
              value={name}
              onChange={
                inputType === 'radio' ? () => updateAttributeValue(optionType, id) : () => updateAttributeArray(optionType, id)
              }
              checked={isSelected}
              >
            </input>
            {/* {isSelected && <i className="fas fa-check concept-attribute-checkmark"></i>} */}
          <label htmlFor={name} className="concept-add-attributes-option-label">{name}</label>
        </div>
      )
    })
  }

  render() {
    const { selectedOpportunityAreas, selectedDvMatrixType, selectedKeyTechnologies, selectedDvArchetypes } = this.props;
    return (
      <div>
        <div className="concept-add-attributes-header">
          <div className="concept-add-attributes-header-title">
            Add tags so you can track your concept as part of the innovation portfolio
          </div>
          <div className="concept-add-attributes-header-subtitle">
            At least one tag is required for each attribute type
          </div>
        </div>
        <ContentBox>
          <div className={classnames('concept-add-attributes-options-container', {'incomplete': false})}>
            <div>Opportunity Area</div>
            <div className="concept-add-attributes-options-row">
              {
                this.createOptions('selectedOpportunityAreas', availableOppAreas, selectedOpportunityAreas, 'checkbox')
              }
            </div>
          </div>
          <div className={classnames('concept-add-attributes-options-container', {'incomplete': false})}>
            <div>DV 2 x 2 Matrix</div>
            <div className="concept-add-attributes-options-row">
              {
                this.createOptions('selectedDvMatrixType', availableDvMatrix, selectedDvMatrixType, 'radio')
              }
            </div>
          </div>
          <div className={classnames('concept-add-attributes-options-container', {'incomplete': false})}>
            <div>Key Technologies</div>
            <div className="concept-add-attributes-options-row">
              {
                this.createOptions('selectedKeyTechnologies', availableKeyTech, selectedKeyTechnologies, 'checkbox')
              }
            </div>
          </div>
          <div className={classnames('concept-add-attributes-options-container', {'incomplete': false})}>
            <div>DV Archetypes</div>
            <div className="concept-add-attributes-options-row">
              {
                this.createOptions('selectedDvArchetypes', availableArchetypes, selectedDvArchetypes, 'checkbox')
              }
            </div>
          </div>
        </ContentBox>
      </div>
    )
  }
}

export default ConceptAddAttributes;

// ConceptAddAttributes.propTypes = {
//   // TODO.
// }
