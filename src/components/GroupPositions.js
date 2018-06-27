import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ConceptAvatar from './concept/ConceptAvatar';
import ContentBox from './layout/ContentBox';

import '../styles/css/group-positions.css';

/**
 * GroupPositions
 *
 * Enlarged Group view allowing for greater precision in viewing, and editing confidence
 *
 * @param {string} label - label for the group
 * @param {array} items - list of concept objects to show in this group
 * @param {function} onFocus - callback function to direct focus to this Group in the parent container
 */

class GroupPositions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      dragging: null,
      confidence: null,
      items: []
    };

    this.dragBounds = null;
  }

  componentDidUpdate() {
    if(this.state.items !== this.props.items) {
      this.setState({
        ...this.state,
        items: this.props.items
      });
    }
  }

  trigger = (label) => {
    this.setState({
      active: !this.state.active
    });
    
    this.props.onFocus(label);
  }

  dragStart = (name, confidence, e) => {
    this.dragBounds = document.getElementById('position-items').getBoundingClientRect();

    const img = document.createElement('span');
    img.setAttribute('style', 'position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;' );
    e.dataTransfer.setDragImage(img, 0, 0);

    this.setState({ ...this.state, dragging: name, confidence: confidence });
  }

  dragEnd = (e) => {
    this.setState({ ...this.state, dragging: null, confidence: null })
  }

  updatePosition = (id, e) => {
    if(e.pageY) {
      const top = this.dragBounds.top;
      const bottom = this.dragBounds.bottom;
      const range = bottom - top;

      let relativePos = e.pageY - top;

      if(relativePos < 0) {
        relativePos = 0;
      } else if(relativePos > range) {
        relativePos = range;
      }

      relativePos = Math.round((relativePos / range) * 100);

      //Mouse position e.pageY
      const newItems = this.state.items;

      newItems.forEach(item => {
        if(item.id === id) {
          item.confidence = 100 - relativePos;
        }
      });

      this.setState({
        ...this.state,
        items: newItems,
        confidence: 100 - relativePos
      });
    }
  }

  render() {
    const { label } = this.props;
    const { items, active, dragging, confidence } = this.state;

    if(!active) {
      return (
        <div className="group-position-trigger" onClick={() => this.trigger(label)}>Enlarge/edit</div>
      );
    }

    return (
      <div className="group-position">
        <div className="group-position-header">
          <div className="group-position-label">
            <div className="group-position-back" onClick={() => this.trigger(null)}><i className="fas fas-2x fa-chevron-left" /></div>
            {label}
          </div>

          {dragging &&
            <div className="group-position-alert">
              {dragging} confidence: {confidence}%
            </div>
          }
        </div>

        <div id="position-items" className="group-position-items">
          <ContentBox>
          {
            items && items.map((item, count) => {
              return (
                <div 
                  key={`avatar-${count}`} 
                  className={classnames('group-position-item', { dragging: dragging === item.name })}
                  style={{ 'top': `${100 - item.confidence}%` }}
                  draggable
                  onDragStart={(e) => this.dragStart(item.name, item.confidence, e)}
                  onDrag={(e) => this.updatePosition(item.id, e)}
                  onDragEnd={(e) => this.dragEnd(e)}
                >
                  <ConceptAvatar 
                    conceptId={item.id}
                    logo={item.logo}
                    ident={item.ident}
                    color={item.color}
                    showLink={false}
                    size="large"
                  />
                </div>
              )
            })
          }
          </ContentBox>
        </div>
      </div> 
    );
  }
}

GroupPositions.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({ 
      id: PropTypes.number,
      name: PropTypes.string,
      logo: PropTypes.string,
      ident: PropTypes.string,
      color: PropTypes.string,
      confidence: PropTypes.string
    })
  ),
  onFocus: PropTypes.func
};

GroupPositions.defaultProps = {
};

export default GroupPositions;
