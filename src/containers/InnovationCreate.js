import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import InnovationAddPartner from '../components/innovation/InnovationAddPartner';
import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import FormSectionHeader from '../components/formInputs/FormSectionHeader';

import BackTextLink from '../components/buttons/BackTextLink';
import ButtonSubmit from '../components/buttons/ButtonSubmit';

import { createInnovation } from '../actions/innovations';
import { removeNullValueAttrs } from '../utils/functions';

import '../styles/css/innovation-create.css';

class InnovationCreate extends Component {
  state = {
    datePickerOpen: false,
    partnerCCode: '',
    partnerName: '',
    partnerIndustry: '',
    partnerCity: '',
    partnerCountry: '',
    partnerDescription: '',
    innovationType: null,
    innovationName: '',
    dvOffice: '',
    dvPartner1: '',
    dvPartner2: '',
    teamGMEmail: '',
    innovationOpenDate: null,
    innovationDuration: ''
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  updateDateField = (newDate) => {
    this.setState({ innovationOpenDate: newDate })
  }

  toggleDatePicker = () => {
    this.setState({ datePickerOpen: !this.state.datePickerOpen });
  }

  selectOption = (key, value) => {
    this.setState({ [key]: value })
  }

  submitNewInnovation = () => {
    const { createInnovation } = this.props;
    const {
      partnerCCode, partnerName, partnerIndustry, partnerCity, partnerCountry, partnerDescription,
      innovationType, innovationName, dvOffice, dvPartner1, dvPartner2, innovationOpenDate
    } = this.state;
    // Need to pass the two separate data objects to the action. One for the Partner and one for the Innovation.
    const partnerData = {
      name: partnerName,
      description: partnerDescription,
      hqCity: partnerCity,
      hqCountry: partnerCountry,
      industry: partnerIndustry
    }
    const innovationData = {
      chargeCode: partnerCCode,
      innovationType: innovationType,
      sprintName: innovationName,
      dvPartner1: dvPartner1,
      dvPartner2: dvPartner2,
      openDate: moment(innovationOpenDate).format('YYYY-MM-DD'),
      dvOffice: dvOffice
    }
    const newPartner = removeNullValueAttrs(partnerData);
    const newInnovation = removeNullValueAttrs(innovationData);
    createInnovation(newPartner, newInnovation);
  }

  fieldsAreCompleted = () => {
    return Object.values(this.state).every(field => (field !== null && field !== '' && field !== {} && field !== undefined));
  }

  render() {
    const fieldsAreCompleted = this.fieldsAreCompleted();
    return (
      <div className="create-innovation-container">
        <div className="create-innovation-page-title">Create A New Innovation</div>
        <div className="create-innovation-section-container">
          <FormSectionHeader
            title="Corporate Partner Details"
          />
          <InnovationAddPartner
            updateFormField={this.updateFormField}
            partnerCCode={this.state.partnerCCode}
            partnerName={this.state.partnerName}
            partnerIndustry={this.state.partnerIndustry}
            partnerCity={this.state.partnerCity}
            partnerCountry={this.state.partnerCountry}
            partnerDescription={this.state.partnerDescription}
          />
        </div>
        <div className="create-innovation-section-container">
          <FormSectionHeader
            title="Innovation Details"
          />
          <InnovationAddDetails
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            updateDateField={this.updateDateField}
            innovationType={this.state.innovationType}
            innovationName={this.state.innovationName}
            dvOffice={this.state.dvOffice}
            dvPartner1={this.state.dvPartner1}
            dvPartner2={this.state.dvPartner2}
            teamGMEmail={this.state.teamGMEmail}
            innovationOpenDate={this.state.innovationOpenDate}
            innovationDuration={this.state.innovationDuration}
            datePickerOpen={this.state.datePickerOpen}
            toggleDatePicker={this.toggleDatePicker}
          />
        </div>
        <div className="create-innovation-user-actions">
          <BackTextLink
            label="Back"
            onClick={() => this.props.history.goBack()}
          />
          <ButtonSubmit
            label={fieldsAreCompleted ? 'Save' : 'Complete Required Fields'}
            onClick={() => this.submitNewInnovation()}
            // disabled={!fieldsAreCompleted}
          />
        </div>
      </div>
    )
  }
}

InnovationCreate.propTypes = {
 createInnovation: PropTypes.func,
 history: PropTypes.object
}

const actions = { createInnovation };

export default connect(null, actions)(InnovationCreate);
