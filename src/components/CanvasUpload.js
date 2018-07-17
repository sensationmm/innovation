import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/css/canvas-content.css';

class CanvasUpload extends Component {

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
    const { label } = this.props;

    return (
      <div className="canvas-content">
        <div className="canvas-content-header">{label}</div>

        
      </div>
    );
  }
}

CanvasUpload.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string
};

export default CanvasUpload;
