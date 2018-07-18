import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../layout/FormTextInput';
import FormSelectButtons from '../layout/FormSelectButtons';

import '../../styles/css/concept-create.css';

import { businessTypes, salesChannels } from '../../config/conceptOptions';

const ConceptBusinessModel = (props) => {
  const { businessType, salesChannel, revenueModel, unitEconomics, selectOption, updateFormField } = props;
  return (
    <div>
      <FormSelectButtons
        isMultiSelect={false}
        options={businessTypes}
        selectedValues={businessType}
        selectOption={selectOption}
        keyToUpdate='businessType'
        title='Business Type'
      />
      <FormSelectButtons
        isMultiSelect={false}
        options={salesChannels}
        selectedValues={salesChannel}
        selectOption={selectOption}
        keyToUpdate='salesChannel'
        title='Sales Channel'
      />
      <FormTextInput
        id="revenueModel"
        placeholder="Revenue Model"
        onChange={updateFormField}
        value={revenueModel}
      />
      <FormTextInput
        id="unitEconomics"
        placeholder="Unit Economics"
        onChange={updateFormField}
        value={unitEconomics}
      />
    </div>
  )
}

ConceptBusinessModel.propTypes = {

}

export default ConceptBusinessModel;
