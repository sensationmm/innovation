import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import ButtonCancel from '../buttons/ButtonCancel';
import ButtonSubmit from '../buttons/ButtonSubmit';

import { capitaliseFirst } from '../../utils/functions';

import '../../styles/css/comment-confirm-update.css';

class CommentConfirmUpdate extends Component {
  state = {
    comment: ''
  }

  handleInput = (e) => {
    this.setState({ comment: e.target.value });
  }

  render() {
    const { name, changes, type, onCancel, onSubmit } = this.props;
    return (
      <Modal>
        <div className="comment-complete-update-modal">
          <div className="comment-complete-update-name">{name}</div>
          <div className="comment-complete-update-header">Confirm {type} update</div>
          <div className="comment-complete-update-changed">
            <div className="comment-complete-update-changed-to">
              Changing to:
            </div>
            <div className="comment-complete-update-attributes">
              {
                Object.keys(changes).map(key => (
                  <div key={`comment-complete-update-${key}`} className="comment-complete-update-attribute">
                    {capitaliseFirst(key)}: {capitaliseFirst(changes[key])}
                  </div>
                ))
              }
            </div>
          </div>
          <div className="comment-complete-update-input">
            <div className="comment-complete-update-input-title">Add additional information:</div>
            <textarea
              id="comment"
              placeholder="Any additional information to explain this update"
              onChange={this.handleInput}
              value={this.state.comment}
            />
          </div>
          <div className="comment-complete-update-user-actions">
            <ButtonCancel
              onClick={onCancel}
              label="Cancel"
            />
            <ButtonSubmit
              onClick={() => onSubmit(this.state.comment)}
              label="Confirm"
            />
          </div>
        </div>
      </Modal>
    )
  }
}

CommentConfirmUpdate.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  name: PropTypes.string,
  changes: PropTypes.object,
  type: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};


export default CommentConfirmUpdate;
