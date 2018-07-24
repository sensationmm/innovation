import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../../formInputs/FormTextInput';
import SingleSelectBtnForm from '../../formInputs/SingleSelectBtnForm';

import '../../../styles/css/concept-create.css';

import { businessTypes, salesChannels } from '../../../config/conceptOptions';

const ConceptBusinessModel = (props) => {
  const { businessType, salesChannel, revenueModel, unitEconomics, selectOption, updateFormField } = props;
  return (
    <div>
      <SingleSelectBtnForm
        isMultiSelect={false}
        options={businessTypes}
        selectedValue={businessType}
        selectOption={selectOption}
        keyToUpdate='businessType'
        title='Business Type'
      />
      <SingleSelectBtnForm
        isMultiSelect={false}
        options={salesChannels}
        selectedValue={salesChannel}
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
  businessType: PropTypes.string,
  salesChannel: PropTypes.string,
  revenueModel: PropTypes.string,
  unitEconomics: PropTypes.string,
  selectOption: PropTypes.func,
  updateFormField: PropTypes.func
}

export default ConceptBusinessModel;
