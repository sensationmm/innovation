import React from 'react';

const CorporatePartnerSummary = (props) => {
  const { name, industry, city, businessDescription} = props;
  return (
    <div>
      <div>Name</div>
      <div>Industry</div>
      <div>City</div>
      <div>Business Description</div>
    </div>
  )
}

export default CorporatePartnerSummary;
