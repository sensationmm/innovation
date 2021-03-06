import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import InnovationAddPartner from '../components/innovation/InnovationAddPartner';
import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import FormSectionHeader from '../components/formInputs/FormSectionHeader';

import ButtonSubmit from '../components/buttons/ButtonSubmit';

import { createInnovation } from '../actions/innovations';

import { validateEmail } from '../utils/functions';

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
      innovationType, innovationName, dvOffice, dvPartner1, dvPartner2, innovationOpenDate, teamGMEmail, innovationDuration
    } = this.state;
    // TODO: It may be better to standardise these field names across the BE / FE models and the form component state.
    // Reason for prefixing with -partner- and -innovation- was to avoid confusion between the two (e.g. partnerName / innovationName)
    const partnerData = {
      name: partnerName,
      description: partnerDescription,
      hqCity: partnerCity,
      hqCountry: partnerCountry,
      industryId: partnerIndustry
    }
    const innovationData = {
      sprintType: innovationType,
      sprintName: innovationName,
      chargeCode: partnerCCode,
      dvPartner1: dvPartner1,
      dvPartner2: dvPartner2,
      openDate: moment(innovationOpenDate).format('YYYY-MM-DD'),
      dvOfficeId: dvOffice,
      duration: innovationDuration
    }

    createInnovation(partnerData, innovationData, teamGMEmail);
  }

  fieldsAreCompleted = () => {
    return Object.values(this.state).every(value =>
      (value !== null && value !== '' && value !== {} && value !== undefined)) &&
      validateEmail(this.state.teamGMEmail)
  }

  render() {
    const fieldsAreCompleted = this.fieldsAreCompleted();
    return (
      <div className="create-innovation-container">
        <Link to="/dashboard">
          <span>
            <i className="fas fa-chevron-left"></i>
            <span> Back to Dashboard</span>
          </span>
        </Link>
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
          <Link to="/dashboard">
            <span>
              <i className="fas fa-chevron-left"></i>
              <span> Back to Dashboard</span>
            </span>
          </Link>
          {
            fieldsAreCompleted
              ? (
                <ButtonSubmit
                  label="Save"
                  onClick={() => this.submitNewInnovation()}
                />
              )
              : (
                <div>Please complete all required fields</div>
              )
          }
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
