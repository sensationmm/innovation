import React from 'react';

import '../../styles/css/form-section.header.css';

// These are required to create your innovation timeline, you can edit these later if you need to
// Enter Immersion Session Key Dates

const CreateSectionHeader = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="form-section-header">
      <div className="form-section-header-title">{title}</div>
      {
        subtitle &&
          <div className="form-section-header-subtitle">{subtitle}</div>
      }
    </div>
  )
}

export default CreateSectionHeader;
