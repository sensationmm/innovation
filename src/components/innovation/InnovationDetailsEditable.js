import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import InlineEditTextInput from '../formInputs/InlineEditTextInput';
import { editInnovation } from '../../actions/innovations';
import { innovationTypeLabels } from '../../config/innovationOptions';

import '../../styles/css/innovation-details-editable.css';

class InnovationDetailsEditable extends Component {
  state = {
    changedFields: []
  }

  updateFormField = (e) => {
    const { activeInnovation, editInnovation } = this.props;
    const { changedFields } = this.state;

    if (!changedFields.includes(e.target.id)) { changedFields.push(e.target.id) }

    editInnovation(activeInnovation.id, { [e.target.id]: e.target.value }, false)
  }

  saveToDb = (id, value) => {
    const { activeInnovation, editInnovation } = this.props;
    editInnovation(activeInnovation.id, { [id]: value }, true)
  }

  render() {
    const { activeInnovation } = this.props;
    if (!activeInnovation) { return null }
    const { changedFields } = this.state;

    const borderAlert = activeInnovation.mandate ? {} : { border: '1px solid tomato', borderRadius: '4px' };
    return (
      <div>
        <div className="innovation-details-editable-name">
          <InlineEditTextInput
            id="sprintName"
            placeholder="Innovation name"
            onChange={this.updateFormField}
            value={activeInnovation['sprintName']}
            hasChanged={changedFields.includes('sprintName')}
            saveToDb={this.saveToDb}
          />
        </div>

        <div className="innovation-details-editable-details">
          <div style={borderAlert} className="innovation-details-editable-section">
            <div className="innovation-details-editable-field-title">Innovation Mandate</div>
            <InlineEditTextInput
              id="mandate"
              placeholder="Enter your Innovation mandate"
              onChange={this.updateFormField}
              value={activeInnovation['mandate']}
              hasChanged={changedFields.includes('mandate')}
              saveToDb={this.saveToDb}
              textArea={true}
            />
          </div>

          <div className="innovation-details-editable-column">
            <div className="innovation-details-editable-section">
              <div className="innovation-details-editable-field-title">Type</div>
              <div className="innovation-details-editable-field-content">{innovationTypeLabels[activeInnovation['sprintType']]}</div>
            </div>
            <div className="innovation-details-editable-section">
              <div className="innovation-details-editable-field-title">Open Date</div>
              <div className="innovation-details-editable-field-content">
                {moment(activeInnovation['openDate']).format('MMMM Do YYYY')}
              </div>
            </div>

            <div className="innovation-details-editable-section">
              <div className="innovation-details-editable-field-title">Duration (weeks)</div>
              <InlineEditTextInput
                id="duration"
                placeholder="Innovation duration"
                onChange={this.updateFormField}
                value={activeInnovation['duration']}
                hasChanged={changedFields.includes('duration')}
                saveToDb={this.saveToDb}
              />
            </div>

          </div>

        </div>

      </div>
    )
  }

}

InnovationDetailsEditable.propTypes = {

};

const mapStateToProps = state => ({
  activeInnovation: state.innovations.activeInnovation
});

const actions = { editInnovation };

export default connect(mapStateToProps, actions)(InnovationDetailsEditable);
