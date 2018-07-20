import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { makeArrayFromIndexedObject } from '../../utils/functions';

import ConceptAvatar from './ConceptAvatar';

import '../../styles/css/concept-list.css';

/**
 * ConceptList
 *
 * Renders a list of concepts in a portfolio
 *
 * @param {object} conceptsById - conceptsById form redux store
 */

const ConceptList = props => {
  const list = makeArrayFromIndexedObject(props.conceptsById);

  return (
    <div className="concept-list">
      <div className="concept-list-header">Concepts</div>
      <div className="concept-list-items">
      {
        list.map(concept => {
          const {
            id,
            name,
            logo,
            ident,
            color,
            strapline
          } = concept;

          return (
            <Link className="concept-list-item" key={`concept-${id}`} to={`/concept/${id}`}>
              <div className="concept-list-item-details">
                <ConceptAvatar conceptId={id} ident={ident} color={color} logo={logo} showLink={false}/>
                <h3>{name}</h3>
                <p>{strapline}</p>
                <div>Kill Concept</div>
              </div>
            </Link>
          )
        })
      }
      </div>
    </div>
  )
};

ConceptList.propTypes = {
  conceptsById: PropTypes.object
};

export default ConceptList;
