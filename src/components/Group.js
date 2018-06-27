import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConceptAvatar from './concept/ConceptAvatar';
import GroupPositions from './GroupPositions';

import '../styles/css/group.css';

/**
 * Group
 *
 * Renders a group of avatars
 *
 * @param {string} label - label for the group
 * @param {array} items - list of concept objects to show in this group
 * @param {function} onSetFocus - hides other groups when GroupPositions modal fired
 */

class Group extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  focusGroup = (label) => {
    this.setState({
      focused: !this.state.focused
    });

    this.props.onSetFocus(label);
  }

  render() {
    const { items, label } = this.props;
    const { focused } = this.state;

    return (
      <div className="group">
        <GroupPositions label={label} items={items} onFocus={this.focusGroup} />

        {!focused &&
          <div className="group-items">
          {
            items && items.map((item, count) => {
              return (
                <div key={`avatar-${count}`} style={{ 'top': `${100 - item.confidence}%` }}>
                  <ConceptAvatar 
                    conceptId={item.id}
                    logo={item.logo}
                    ident={item.ident}
                    color={item.color}
                    filteredOut={item.filteredOut}
                  />
                </div>
              )
            })
          }
          </div>
        }

        {!focused && <div className="group-label">{label}</div>}
      </div> 
    );
  }
}

Group.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({ 
      id: PropTypes.number,
      logo: PropTypes.string,
      ident: PropTypes.string,
      color: PropTypes.string,
      filteredOut: PropTypes.bool,
      confidence: PropTypes.string
    })
  ),
  onSetFocus: PropTypes.func
};

Group.defaultProps = {
};

export default Group;
