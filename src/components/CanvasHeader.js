import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/css/canvas-header.css';

class CanvasHeader extends Component {

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
      <div className="canvas-header">
        <div className="canvas-header-title">{label}</div>

        
      </div>
    );
  }
}

CanvasHeader.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string
};

export default CanvasHeader;
