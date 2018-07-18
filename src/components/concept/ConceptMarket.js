import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../layout/FormTextInput';
import FormTextArea from '../layout/FormTextArea';
import Dropdown from '../Dropdown';

import '../../styles/css/concept-create.css';

import { targetIndustries } from '../../config/conceptOptions';

const ConceptMarket = (props) => {
  const { customerSegment, friction, marketSize, targetCustomers, targetIndustry, targetGeography, updateFormField } = props;
  return (
    <div>
      <FormTextInput
        id="customerSegment"
        placeholder="Customer Segment"
        onChange={updateFormField}
        value={customerSegment}
      />
      <FormTextArea
        id="friction"
        placeholder="Friction"
        onChange={updateFormField}
        value={friction}
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
        <Dropdown
          id="targetIndustry"
          value={targetIndustry}
          options={targetIndustries}
          onChange={updateFormField}
          placeholder="Target Industry"
          classes='create-concept-dropdown'
        />
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
  customerSegment: PropTypes.string,
  friction: PropTypes.string,
  marketSize: PropTypes.string,
  targetCustomers: PropTypes.string,
  targetIndustry: PropTypes.string,
  targetGeography: PropTypes.string,
  selectOption: PropTypes.func,
  updateFormField: PropTypes.func
}

export default ConceptMarket;
