import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/modal.css';

/**
* Modal
*
* Wrapper component to display content in a fullscreen modal
*
* @param {element|array} children - any HTML/React components to display as the content
*
* NB. closure of modal is handled by function within children
*/

const Modal = props => {
  const { children } = props;

  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string
  ]).isRequired,
};

export default Modal;
