import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/buttons-and-links.css';

/**
 * Renders an icon which, when clicked, shows a confirm icon. When confirm icon is clicked onConfirm func is run.
 *
 * @param {string} iconClass - icon class (optional)
 * @param {function} onConfirm - action to fire when confirm is clicked
 * @param {string} iconColor - color of the icon
 * @param {string} confirmIconColor - color of the confirm icon
 * @param {string} confirmText - color of the confirm icon
 */

class DeleteIconConfirm extends Component {
  state = {
    openConfirm: false
  }

  render() {
    const { onConfirm, iconClass, iconColor, confirmText } = this.props;
    const { openConfirm } = this.state;
    return (
      <div className="delete-icon-confirm-container">
        {
          openConfirm
            ? (
              <div className="delete-icon-confirm-options buttons-links-fade-in">
                <div onClick={() => onConfirm()} className="delete-icon-confirm-delete">{confirmText}</div>
                <div onClick={() => this.setState({ openConfirm: false })} className="delete-icon-confirm-cancel">Cancel</div>
              </div>
            )
            : <div onClick={() => this.setState({ openConfirm: true })}>
                <i style={{ color: iconColor }} className={`fa fa-window-close ${iconClass}`}></i>
              </div>
        }
      </div>
    )
  }
}

DeleteIconConfirm.propTypes = {
  onConfirm: PropTypes.func,
  iconClass: PropTypes.string,
  iconColor: PropTypes.string,
  confirmText: PropTypes.string
};

export default DeleteIconConfirm;
