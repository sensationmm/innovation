import React from 'react';
import PropTypes from 'prop-types';

import ConceptLogo from './ConceptLogo';

import '../../styles/css/concept-header.css';

/**
 * ConceptHeader
 *
 * Renders logo
 *
 * @param {string} logo - uploaded logo url
 * @param {string} name - concept name
 * @param {string} strapline - concept strapline
 * @param {objec} portfolioDates - renders portfolio timeline
 */

 const ConceptHeader = props => {
  const { logo, name, strapline, location } = props;

  return (
    <div className="concept-header">
      {logo && <ConceptLogo logo={logo.preview} name={name} />}
      <div className="concept-header-name"><h1>{name}</h1></div>
      <div className="concept-header-strapline">{strapline}</div>
      <div className="concept-header-location">{location}</div>
    </div>
  );
};

ConceptHeader.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  strapline: PropTypes.string,
  location: PropTypes.string
};

export default ConceptHeader;
