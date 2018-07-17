import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/css/canvas-content.css';

class CanvasContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  editText = (e) => {
    this.setState({
      ...this.state,
      value: e.target.value
    });
  }

  render() {
    const { value } = this.state;
    const { label } = this.props;

    return (
      <div className="canvas-content">
        <div className="canvas-content-header">{label}</div>

        <div className="canvas-content-text">
          <textarea type="text" value={value} onChange={this.editText} placeholder="Enter text..." />
        </div>

        <div className="canvas-content-tags">Add hashtags...</div>
      </div>
    );
  }
}

CanvasContent.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string
};

export default CanvasContent;
