import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../styles/css/canvas-grid.css';

class CanvasGrid extends Component {

  constructor(props) {
    super(props);

    this.grid = null;

    this.state = {
      pins: [],
      activePin: null,
      editText: ''
    };
  }

  addPin = (e) => {
    if(this.state.activePin === null) {
      const pins = this.state.pins.slice(0);

      const grid = this.grid.getBoundingClientRect();

      pins.push({ 
        id: pins.length,
        label: '', 
        x: (e.clientX - grid.left) / grid.width * 100, 
        y: (e.clientY - grid.top) / grid.height * 100
      });

      this.setState({
        pins: pins,
        activePin: pins.length - 1,
        editText: ''
      });
    } else {
      this.setState({
        ...this.state,
        activePin: null
      });
    }
  }

  editPin = (e) => {
    const { activePin } = this.state;

    const pins = this.state.pins.slice(0);

    pins[activePin].label = e.target.value;

    this.setState({
      ...this.state,
      pins: pins,
      editText: e.target.value
    })
  }

  focusPin = (e) => {
    e.stopPropagation();

    console.log(e.target);

    this.setState({
      ...this.state,
      activePin: e.target.id
    })
  }

  render() {
    const { pins, activePin } = this.state;

    return (
      <div ref={(ref) => this.grid = ref} className="canvas-grid" onClick={this.addPin}>
      {
        pins.map((pin, count) => {
          return (
            <div 
              key={`pin-${count}`} 
              className={classnames('canvas-grid-item', {active: parseInt(activePin, 10) === pin.id})}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <textarea id={pin.id} type="text" value={pin.label} onChange={this.editPin} autoFocus onClick={this.focusPin} />
            </div>
          )
        })
      }

      {
        // activePin !== null && 
        //   <div className="canvas-grid-editor">
        //     <input type="text" value={editText} onChange={this.editPin} autoFocus />
        //   </div>
      }
      </div>
    );
  }
}

CanvasGrid.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(CanvasGrid);
