import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { getIndexByKey } from '../utils/functions';

import '../styles/css/tag-filter.css';

/*
 * TagFilter
 *
 * Renders parent-state-controlled filter component
 *
 * @param {string} label - the label to user for All
 * @param {string} stateItem - the state item from the parent that controls this filter
 * @param {array} tags - array of value:label pairs to render as the options
 * @param {string} active - currently active option
 * @param {function} onSetFilter - state control function from parent
 * eg. setFilter = (filter, stateItem) => {
      this.setState({
        [stateItem]: filter
      })
    }
 */

const TagFilter = (props) => {
  const { label, stateItem, tags, active, onSetFilter } = props;
  
  return (
    <div className="tag-filter">
      <div className="tag-filter-items">
        <div
          className={classnames('tag-filter-item', {'selected': active === null })}
          onClick={() => onSetFilter(null, stateItem)}
        >
          {label}
        </div>
        {
          tags.map((tag, count) => {
            if(!tag.value) {
              return null
            }

            return (
              <div
                key={`tag-filter-${tag.value}`}
                className={classnames('tag-filter-item', {'selected': tag.value === active})}
                onClick={() => onSetFilter(tag.value, stateItem)}
              >
                { tag.label }
              </div>
            );
          })
        }
        </div>
      <div className="tag-filter-track">
        <div className="tag-filter-track-pip" style={{transform: `translateY(${(getIndexByKey(tags, active, 'value') + 1) * 100}%)`}} />
      </div>
    </div>
  )
}

TagFilter.propTypes = {
  label: PropTypes.string,
  stateItem: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  active: PropTypes.string,
  onSetFilter: PropTypes.func.isRequired
};

TagFilter.defaultProps = {
  label: 'All'
};

export default TagFilter;
