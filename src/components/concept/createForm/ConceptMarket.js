import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormTextInput from '../../formInputs/FormTextInput';
import FormTextArea from '../../formInputs/FormTextArea';
import Dropdown from '../../formInputs/Dropdown';

import '../../../styles/css/concept-create.css';

const ConceptMarket = (props) => {
  const {
    marketSegment, marketFriction, marketSize, targetCustomers, targetIndustryId, targetGeography, updateFormField, targetIndustries
  } = props;

  const targetIndustryOptions = targetIndustries.map(targetIndustry => (
    { value: targetIndustry.id, label: targetIndustry.name }
  ))

  // TODO: Move to components/layout as generic label component. Currently gets styles from innovation-create.css.
  const requiredLabel = (<div className="create-innovation-required-label">Required</div>);

  return (
    <div>
      <FormTextInput
        id="marketSegment"
        placeholder="Customer Segment"
        onChange={updateFormField}
        value={marketSegment}
      />
      <FormTextArea
        id="marketFriction"
        placeholder="Friction"
        onChange={updateFormField}
        value={marketFriction}
      />
      <FormTextInput
        id="marketSize"
        placeholder="Market Size"
        onChange={updateFormField}
        value={marketSize}
      />
      <FormTextArea
        id="targetCustomers"
        placeholder="Target Customers"
        onChange={updateFormField}
        value={targetCustomers}
      />
      <div className="create-concept-dropdown-container">
        <div className="create-concept-dropdown-input-title">Target Industry</div>
        <Dropdown
          id="targetIndustryId"
          value={targetIndustryId}
          options={targetIndustryOptions}
          onChange={updateFormField}
          placeholder="Target Industry"
          classes='create-concept-dropdown'
        />
        {!targetIndustryId && requiredLabel}
      </div>
      <FormTextInput
        id="targetGeography"
        placeholder="Target Geography"
        onChange={updateFormField}
        value={targetGeography}
      />
    </div>
  )
}

ConceptMarket.propTypes = {
  marketSegment: PropTypes.string,
  marketFriction: PropTypes.string,
  marketSize: PropTypes.string,
  targetCustomers: PropTypes.string,
  targetIndustryId: PropTypes.string,
  targetGeography: PropTypes.string,
  selectOption: PropTypes.func,
  updateFormField: PropTypes.func,
  targetIndustries: PropTypes.array
}

const mapStateToProps = state => ({
  targetIndustries: state.resources.targetIndustries
})

export default connect(mapStateToProps, null)(ConceptMarket);
