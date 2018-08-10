import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InlineEditTextInput from '../formInputs/InlineEditTextInput';

import { editPartner } from '../../actions/partners';

import '../../styles/css/innovation-details-editable.css';

class PartnerDetailsEditable extends Component {
  state = {
    changedFields: []
  }

  updateFormField = (e) => {
    const { activePartner, editPartner } = this.props;
    const { changedFields } = this.state;

    if (!changedFields.includes(e.target.id)) { changedFields.push(e.target.id) }

    editPartner(activePartner.id, { [e.target.id]: e.target.value }, false)
  }

  saveToDb = (id, value) => {
    const { activePartner, editPartner } = this.props;
    editPartner(activePartner.id, { [id]: value }, true)
  }

  render() {
    const { activePartner } = this.props;
    if (!activePartner) { return null };
    const { name, industryName, hqCity, description } = activePartner;
    const { changedFields } = this.state;

    return (
      <div>
        <h3>Corporate Partner</h3>
        <div className="partner-details-editable-field">
          <span>Name: </span>
          <span>
            <InlineEditTextInput
              id="name"
              placeholder="Name"
              onChange={this.updateFormField}
              value={name}
              hasChanged={changedFields.includes('name')}
              saveToDb={this.saveToDb}
              inline={true}
            />
          </span>
        </div>
        <div className="partner-details-editable-field">
          <span>Industry: </span>
          <span>
            <InlineEditTextInput
              id="industryName"
              placeholder="Industry"
              onChange={this.updateFormField}
              value={industryName}
              hasChanged={changedFields.includes('industryName')}
              saveToDb={this.saveToDb}
              inline={true}
            />
          </span>
        </div>
        <div className="partner-details-editable-field">
          <span>City: </span>
          <span>
            <InlineEditTextInput
              id="hqCity"
              placeholder="HQ city"
              onChange={this.updateFormField}
              value={hqCity}
              hasChanged={changedFields.includes('hqCity')}
              saveToDb={this.saveToDb}
              inline={true}
            />
          </span>
        </div>
        <div className="partner-details-editable-field">
          <span>Business Description: </span>
          <span>
            <InlineEditTextInput
              id="description"
              placeholder="Business description"
              onChange={this.updateFormField}
              value={description}
              hasChanged={changedFields.includes('description')}
              saveToDb={this.saveToDb}
              textarea={true}
            />
          </span>
        </div>
      </div>
    )
  }
}

PartnerDetailsEditable.propTypes = {
  activePartner: PropTypes.object,
  editPartner: PropTypes.func
}

const mapStateToProps = state => ({
  activePartner: state.partners.activePartner
});

const actions = { editPartner };

export default connect(mapStateToProps, actions)(PartnerDetailsEditable);
