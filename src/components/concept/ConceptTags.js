import React from 'react';
import PropTypes from 'prop-types';

import { matrixes, archetypes, keyTechs } from '../../config/conceptOptions';

import Dropdown from '../Dropdown';
import ConceptMeta from './ConceptMeta';

/**
 * Concept Tags
 *
 * Renders a set of data tags into the ConceptMeta componet
 *
 * @param { string } matrix - the 2x2 matrix value the concept is tagged with
 * @param { number } opportunityArea - the opportunity area the concept is tagged with
 * @param { array } opportunityAreas - an array of opportunity areas registered against the portfolio
 * @param { string } technology - the key technology the concept is tagged with
 * @param { string } archetype - the archetype the concept is tagged with
 *
 * @return a ConceptMeta object
 */

const ConceptSummary = props => {
  const { opportunityArea, opportunityAreas, technology, matrix, archetype } = props;

  const stats = [
    {
      label: 'Opportunity Area',
      content: (
        <Dropdown
          id="riskType"
          value={opportunityArea}
          onChange={() => {}}
          options={opportunityAreas}
          classes="small"
        />
      )
    }, 
    {
      label: 'Key Technologies',
      content: (
        <Dropdown
          id="riskType"
          value={technology}
          onChange={() => {}}
          options={keyTechs}
          classes="small"
        />
      )
    }, 
    {
      label: '2x2 Matrix',
      content: (
        <Dropdown
          id="riskType"
          value={matrix}
          onChange={() => {}}
          options={matrixes}
          classes="small"
        />
      )
    }, 
    {
      label: 'Archetype',
      content: (
        <Dropdown
          id="riskType"
          value={archetype}
          onChange={() => {}}
          options={archetypes}
          classes="small"
        />
      )
    }
  ];

  return <ConceptMeta label="Concept Tags" stats={stats} />;
};

ConceptSummary.propTypes = {
  matrix: PropTypes.string,
  opportunityArea: PropTypes.number,
  opportunityAreas: PropTypes.array,
  technology: PropTypes.string,
  archetype: PropTypes.string
};

export default ConceptSummary;
