import React from 'react';
import PropTypes from 'prop-types';

import ConceptAvatar from './concept/ConceptAvatar';

import '../styles/css/group.css';

/**
 * Group
 *
 * Renders circular avatar icon for a concept
 *
 * @param {string} logo - short text string to display in the avatar
 * @param {string} ident - short text string to display in the avatar
 * @param {string} color - background color for the avatar
 * @param {string} size [small, large] - render size of the avatar
 */

const Group = props => {
  const { items, label } = props;

  return (
    <div className="group">
      <div className="group-items">
      {
        items && items.map((item, count) => {
          return (
            <ConceptAvatar 
              key={`avatar-${count}`}
              conceptId={item.id}
              logo={item.logo}
              ident={item.ident}
              color={item.color}
              filteredOut={item.filteredOut}
            />
          )
        })
      }
      </div>
      <div className="group-label">{label}</div>
    </div> 
  );
};

Group.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array
};

Group.defaultProps = {
};

export default Group;
