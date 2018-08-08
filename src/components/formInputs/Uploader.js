import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import Config from '../../config';

import '../../styles/css/uploader.css';

import Loader from '../Loader';
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

      if(!this.props.multiple) {
        this.props.storeLogo(acceptedFiles[0]);
      } else {
        this.props.storeLogo(acceptedFiles);
      }
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
    const { logo, messageText, existingLogo, multiple, viewable, isLoadingCanvas } = this.props;
    const { hover, error } = this.state;
    const logoUrl = existingLogo && !logo.preview
                      ? `${Config.apiDomain}${logo}`
                      : (logo && logo.preview) ? logo.preview : IconUpload
    return (
      <div 
        className={classnames('logo-upload-container', { 'hover': hover }, { viewable: viewable })} 
        style={{backgroundImage:`url(${logoUrl})`}}
      > 
        <Dropzone
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          // maxSize={this.props.maxSize}
          multiple={multiple}
          className="logo-upload-dropzone"
          accept="image/*"
        />

        {viewable &&
          <div className="logo-upload-thumbs">
          {Array.isArray(logo)
            ? logo.map((file, count) => {
              return (
                <div className="logo-upload-thumb" key={`canvas-${count}`}>
                  <a href={`${(file.substr(0,4) !== 'blob') ? Config.apiDomain : ''}${file}`} target="_blank" rel="noopener noreferrer">
                    <img src={`${(file.substr(0,4) !== 'blob') ? Config.apiDomain : ''}${file}`} alt="Canvas" />
                  </a>
                </div>
              )
            })

            : (
              <div className="logo-upload-thumb">
                <a href={`${Config.apiDomain}${logo}`} target="_blank" rel="noopener noreferrer">
                  <img src={`${Config.apiDomain}${logo}`} alt="Canvas" />
                </a>
              </div>
            )
          }
          </div>
        }

        {
          (logo && !logo.preview) && <div className="logo-upload-message-text">{messageText}</div>
        }
        { error && <div className="logo-upload-error">{error}</div> }

        {multiple && isLoadingCanvas &&
          <div className="logo-upload-loader">
            <Loader mini />
          </div>
        }
      </div>
    );
  }
}

Uploader.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  showLabel: PropTypes.bool,
  storeLogo: PropTypes.func,
  messageText: PropTypes.string,
  existingLogo: PropTypes.bool,
  multiple: PropTypes.bool,
  viewable: PropTypes.bool,
  isLoadingCanvas: PropTypes.bool
};

Uploader.defaultProps = {
  showLabel: false,
  viewable: false
};

const mapStateToProps = (state, props) => ({
  isLoadingCanvas: state.loader.isLoadingCanvas
});

export default connect(mapStateToProps)(Uploader);
