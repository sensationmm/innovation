import React from 'react';
import { connect } from 'react-redux';

const AlertPopup = (props) => {
  const { message } = props;
  if (!message) {
    return null
  } else {
    return (
      <div>
        <div>
          {message}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.ui.message
});

export default connect(mapStateToProps, null)(AlertPopup);
