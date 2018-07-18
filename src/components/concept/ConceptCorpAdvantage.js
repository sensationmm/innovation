import React from 'react';
import PropTypes from 'prop-types';

import FormTextArea from '../layout/FormTextArea';

import '../../styles/css/concept-create.css';

const ConceptCorpAdvantage = (props) => {
  const { corporateAdvantage, leveragedAssets, updateFormField } = props;
  return (
    <div>
      <FormTextArea
        id="corporateAdvantage"
        placeholder="Why can the Corporate Partner win?"
        onChange={updateFormField}
        value={corporateAdvantage}
      />
      <FormTextArea
        id="leveragedAssets"
        placeholder="Corporate Partner assets leveraged"
        onChange={updateFormField}
        value={leveragedAssets}
      />
    </div>
  )
}

ConceptCorpAdvantage.propTypes = {
  corporateAdvantage: PropTypes.string,
  leveragedAssets: PropTypes.string,
  updateFormField: PropTypes.func
}

export default ConceptCorpAdvantage;
