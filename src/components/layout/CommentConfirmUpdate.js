import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

import '../../styles/css/comment-confirm-update.css';

class CommentConfirmUpdate extends Component {
  state = {
    comment: ''
  }

  handleInput = (comment) => {

  }

  render() {
    const { id, name, changes, onCancel, onSubmit } = this.props;
    return (
      <Modal>
        <div className="inventure-comment-modal">
          <div>I will be the comment modal</div>
          <div>{id}</div>
          <div>{name}</div>
          <input
            type="text"
            value={this.state.comment}
            onChange={this.handleInput}
            placeholder="Please explain the status change"
          />
          <div onClick={onSubmit}>Confirm</div>
          <div onClick={onCancel}>Cancel</div>
        </div>
      </Modal>
    )
  }
}

CommentConfirmUpdate.propTypes = {
  
};


export default CommentConfirmUpdate;
