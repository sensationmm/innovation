import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';

import { IconUpload } from '../images/upload-icon.svg';

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      error: null
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      this.setState({
        ...this.state,
        hover: false,
        error: 'File type must be an image'
      });
      this.props.storeLogo(null);
    } else {
      this.setState({
        ...this.state,
        hover: false,
        error: null
      });

      this.props.storeLogo(acceptedFiles[0]);
    }
  }

  onDragEnter = () => {
    this.setState({
      ...this.state,
      hover: true
    });
  }

  onDragLeave = () => {
    this.setState({
      ...this.state,
      hover: false
    });
  }

  render() {
    const { logo } = this.props;
    const { hover, error } = this.state;

    return (
      <div className={classnames('venture-upload', {'hover': hover})} style={{backgroundImage:`url(${(logo && logo.preview) ? logo.preview : IconUpload})`}}>
        <Dropzone
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          // maxSize={this.props.maxSize}
          multiple={false}
          className="venture-upload-dropzone"
          accept="image/*"
        />
        { error && <div className="venture-upload-error">{error}</div> }
      </div>
    );
  }
};

Uploader.propTypes = {
  logo: PropTypes.object,
  showLabel: PropTypes.bool,
  storeLogo: PropTypes.func
};

Uploader.defaultProps = {
  showLabel: false
};

export default Uploader;
