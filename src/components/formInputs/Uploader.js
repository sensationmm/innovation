import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';

import ContentBox from '../layout/ContentBox';

import '../../styles/css/uploader.css';

import IconUpload from '../../images/upload-icon.svg';

class Uploader extends Component {
  state = {
    hover: false,
    error: null
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      this.setState({
        hover: false,
        error: 'File type must be an image'
      });
      this.props.storeLogo(null);
    } else {
      this.setState({
        hover: false,
        error: null
      });

      this.props.storeLogo(acceptedFiles[0]);
    }
  }

  onDragEnter = () => {
    this.setState({
      hover: true
    });
  }

  onDragLeave = () => {
    this.setState({
      hover: false
    });
  }

  render() {
    const { logo, messageText } = this.props;
    const { hover, error } = this.state;
    return (
      <ContentBox>
        <div className={classnames('logo-upload-container', { 'hover': hover })} style={{backgroundImage:`url(${(logo && logo.preview) ? logo.preview : IconUpload})`}}>
          <Dropzone
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            // maxSize={this.props.maxSize}
            multiple={false}
            className="logo-upload-dropzone"
            accept="image/*"
          />
          {
            (logo && !logo.preview) && <div className="logo-upload-message-text">{messageText}</div>
          }
          { error && <div className="logo-upload-error">{error}</div> }
        </div>
      </ContentBox>
    );
  }
}

Uploader.propTypes = {
  logo: PropTypes.object,
  showLabel: PropTypes.bool,
  storeLogo: PropTypes.func,
  messageText: PropTypes.string
};

Uploader.defaultProps = {
  showLabel: false
};

export default Uploader;
