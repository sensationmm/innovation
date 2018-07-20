import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import InnovationAddPartner from '../components/innovation/InnovationAddPartner';
import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import FormSectionHeader from '../components/layout/FormSectionHeader';

import BackTextLink from '../components/buttons/BackTextLink';
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
    teamGMEmail: '', // TODO: If user is Team GM then autofill teamGMEmail on mount.
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
    const newPartner = {
      name: partnerName,
      description: partnerDescription,
      hqCity: partnerCity,
      hqCountry: partnerCountry,
      industry: partnerIndustry
    }
    const newInnovation = {
      chargeCode: partnerCCode,
      innovationType: innovationType,
      sprintName: innovationName,
      dvPartner1: dvPartner1,
      dvPartner2: dvPartner2,
      openDate: moment(innovationOpenDate).format('YYYY-MM-DD'),
      dvOffice: dvOffice
    }
    createInnovation(newPartner, newInnovation);
  }

  fieldsAreCompleted = () => {
      const {
        partnerCCode, partnerName, innovationType, innovationName, teamGMEmail, innovationOpenDate
      } = this.state;
      return partnerCCode && partnerName && innovationType && innovationName &&
             innovationOpenDate && teamGMEmail && validateEmail(teamGMEmail);
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
            disabled={!fieldsAreCompleted}
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

const mapDispatchToProps = dispatch => ({
  createInnovation: bindActionCreators(createInnovation, dispatch)
});

export default connect(null, mapDispatchToProps)(InnovationCreate);
