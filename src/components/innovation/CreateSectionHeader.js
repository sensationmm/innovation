import React from 'react';

import '../../styles/css/innovation-create.css';

// These are required to create your innovation timeline, you can edit these later if you need to
// Enter Immersion Session Key Dates

const CreateSectionHeader = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="create-innovation-section-header">
      <div className="create-innovation-section-header-title">{title}</div>
      {
        subtitle &&
          <div className="create-innovation-section-header-subtitle">{subtitle}</div>
      }
    </div>
  )
}

export default CreateSectionHeader;
