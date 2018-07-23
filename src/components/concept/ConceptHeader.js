import React from 'react';
import PropTypes from 'prop-types';

import ConceptLogo from './ConceptLogo';
import ProgressBar from '../ProgressBar';

import '../../styles/css/concept-header.css';

/**
 * ConceptHeader
 *
 * Renders logo
 *
 * @param {string} logo - uploaded logo url
 * @param {string} name - concept name
 * @param {string} strapline - concept strapline
 * @param {string} location - portfolio/concept location
 * @param {string} killMark - timestamp if a concept has been killed, renders kill icon on timeline
 * @param {objec} portfolioDates - renders portfolio timeline
 */

 const ConceptHeader = props => {
  const { logo, name, strapline, location, portfolioDates, killMark } = props;

  const milestonesLabels = Object.keys(portfolioDates);
  const milestonesDates = milestonesLabels.map(label => {
    return portfolioDates[label];
  });

  return (
    <div className="concept-header">
      {logo && <ConceptLogo logo={logo.preview} name={name} />}
      <div className="concept-header-name"><h1>{name}</h1></div>
      <div className="concept-header-strapline">{strapline}</div>
      <div className="concept-header-location">{location}</div>

      {/* <ProgressBar dates={milestonesDates} labels={milestonesLabels} killMark={killMark} /> */}
    </div>
  );
};

ConceptHeader.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  strapline: PropTypes.string,
  location: PropTypes.string,
  killMark: PropTypes.string,
  portfolioDates: PropTypes.object
};

export default ConceptHeader;
