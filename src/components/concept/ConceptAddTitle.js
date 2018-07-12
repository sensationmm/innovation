import React from 'react';
// import PropTypes from 'prop-types';

import Uploader from '../Uploader';

import '../../styles/css/concept-add-title.css';

const ConceptAddTitle = (props) => {
  const { conceptName, conceptLogo, updateConceptName, updateConceptLogo } = props;
  return (
    <div>
      <div className="concept-add-title-name">
        <input
          type="text"
          id="title"
          placeholder="Add concept name"
          onChange={(e) => updateConceptName('conceptName', e.target.value)}
          value={conceptName}
        />
      </div>
      <div className="concept-add-title-logo">
        <Uploader
          logo={conceptLogo}
          storeLogo={updateConceptLogo}
          messageText="Upload Concept Logo"
        />
      </div>
    </div>
  )
}

export default ConceptAddTitle;

// ConceptAddTitle.propTypes = {
//   // TODO.
// }
