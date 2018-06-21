import React from 'react';
import PropTypes from 'prop-types';
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
      <div className="concept-list-header">My Concepts</div>
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
            <div className="concept-list-item" key={`concept-${id}`}>
              <ConceptAvatar conceptId={id} ident={ident} color={color} logo={logo} />
              <div className="concept-list-item-details">
                <h3>{name}</h3>
                <p>{strapline}</p>
              </div>
            </div>
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
