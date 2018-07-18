import React from 'react';
import PropTypes from 'prop-types';

import FormTextArea from '../layout/FormTextArea';
import RankSelectForm from '../layout/RankSelectForm';

import '../../styles/css/concept-create.css';

import { businessTypes, salesChannels } from '../../config/conceptOptions';

const ConceptConviction = (props) => {
  const { GMRank, GMComments, CPPreferences, selectOption, updateFormField } = props;

  return (
    <div>
      <RankSelectForm
        keyToUpdate="GMRank"
        rankRange={5}
        selectedValue={GMRank}
        selectOption={selectOption}
        labels={['weak', 'strong']}
        title="GM's Conviction"
      />
      <FormTextArea
        id="GMComments"
        placeholder="GM's Comments"
        onChange={updateFormField}
        value={GMComments}
      />
      <FormTextArea
        id="CPPreferences"
        placeholder="Comments on Corporate Partner preferences"
        onChange={updateFormField}
        value={CPPreferences}
      />
    </div>
  )
}

ConceptConviction.propTypes = {

}

export default ConceptConviction;
