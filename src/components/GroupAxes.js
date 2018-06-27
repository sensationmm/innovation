import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../styles/css/group-axes.css';

/**
* GroupAxes
*
* Renders an X/Y axes for the Group 
*
* @param {element|array} children - Group components to render as the content
* @param {array} labels - 2D array of X/Y axis labels. Should match count in children
*/

class GroupAxes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gridHeight: 0
    };

    this.container = null;
  }

  componentDidMount() {
    const gridHeight = this.container.clientHeight;
    this.setState({ gridHeight });
  }

  render() {
    const { children, labels } = this.props;

    return (
      <div className={classnames('group-axes', { empty: labels === null })} ref={(ref) => this.container = ref}>
        <div className="group-axes-content">{children}</div>

        {labels &&
          <div className="group-axes-labels x-axis">
          {
            labels[0].map((label, count) => {
              return <div key={`label-${count}`}>{label}</div>
            })
          }
          </div>
        }

        {labels &&
          <div className="group-axes-labels y-axis" style={{ width: this.state.gridHeight }}>
          {
            labels[1].map((label, count) => {
              return <div key={`label-${count}`}>{label}</div>
            })
          }
          </div>
        }
      </div>
    )
  }
}

GroupAxes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  labels: PropTypes.array
};

export default GroupAxes;
