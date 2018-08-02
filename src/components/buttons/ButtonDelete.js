import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/buttons-and-links.css';

class ButtonDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmStep: false
    }
  }

  render() {
    const { label, onDelete } = this.props;
    const { confirmStep } = this.state;

    return (
      <div>
        {!confirmStep
          ? <button
            className="delete-button"
            onClick={() => this.setState({ confirmStep: true })}
            >{label}</button>

          : <div className="delete-confirm-steps">
              <button
                className="delete-button confirm"
                onClick={onDelete}
              >Confirm delete?</button>

              <button
                className="delete-button cancel"
                onClick={() => this.setState({ confirmStep: false })}
              >Cancel</button>
            </div>
        }
      </div>
    )
  }
}

ButtonDelete.propTypes = {
  label: PropTypes.string,
  onDelete: PropTypes.func
};

ButtonDelete.defaultProps = {
  label: 'Delete'
};

export default ButtonDelete;
