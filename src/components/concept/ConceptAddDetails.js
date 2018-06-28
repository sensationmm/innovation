import React from 'react';
import PropTypes from 'prop-types';

import Uploader from '../Uploader';

import '../../styles/css/concept-add-details.css';

const ConceptAddDetails = (props) => {
  const { conceptStrapline, conceptDescription, updateConceptDetails } = props;
  return (
    <div>
      <div className="concept-add-details-strapline">
        <input
          type="text"
          id="strapline"
          placeholder="Enter concept strapline"
          onChange={(e) => updateConceptDetails('conceptStrapline', e.target.value)}
          value={conceptStrapline}
        />
      </div>
      <div className="concept-add-details-description">
        <textarea
          type="text"
          id="description"
          placeholder="Enter concept description"
          onChange={(e) => updateConceptDetails('conceptDescription', e.target.value)}
          value={conceptDescription}
        />
      </div>
    </div>
  )
}

export default ConceptAddDetails;

// ConceptAddDetails.propTypes = {
//   // TODO.
// }
