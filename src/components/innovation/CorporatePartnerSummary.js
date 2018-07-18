import React from 'react';
import PropTypes from 'prop-types';

const CorporatePartnerSummary = (props) => {
  const { name, industry, city, businessDescription} = props;
  return (
    <div>
      <div>Name: {name}</div>
      <div>Industry: {industry}</div>
      <div>City: {city}</div>
      <div>Business Description: {businessDescription}</div>
    </div>
  )
}

CorporatePartnerSummary.propTypes = {
  name: PropTypes.string,
  industry: PropTypes.string,
  city: PropTypes.string,
  businessDescription: PropTypes.string
}

export default CorporatePartnerSummary;
