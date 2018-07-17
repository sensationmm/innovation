import React from 'react';
import PropTypes from 'prop-types';

import Uploader from '../Uploader';

import '../../styles/css/innovation-add-title.css';

const InnovationAddDetails = (props) => {
  const { innovationName, innovationLogo, updateInnovationName, updateInnovationLogo } = props;
  return (
    <div>
      <div className="innovation-add-title-name">
        <input
          type="text"
          id="title"
          placeholder="Enter innovation name"
          onChange={(e) => updateInnovationName('innovationName', e.target.value)}
          value={innovationName}
        />
      </div>
      <div className="innovation-add-title-logo">
        <Uploader
          logo={innovationLogo}
          storeLogo={updateInnovationLogo}
          messageText="Upload Innovation Logo"
        />
      </div>
    </div>
  )
}

InnovationAddDetails.propTypes = {
  innovationName: PropTypes.string,
  innovationLogo: PropTypes.object,
  updateInnovationName: PropTypes.func,
  updateInnovationLogo: PropTypes.func
}

export default InnovationAddDetails;
