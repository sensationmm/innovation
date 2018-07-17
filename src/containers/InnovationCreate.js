import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddPartner from '../components/innovation/InnovationAddPartner';
import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import CreateSectionHeader from '../components/innovation/CreateSectionHeader';
// import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
// import InnovationAddDates from '../components/innovation/InnovationAddDates';
// import UserProgressIndicator from '../components/UserProgressIndicator';

import ButtonNext from '../components/buttons/ButtonNext';

import '../styles/css/innovation-create.css';

import { createInnovation } from '../actions/innovations';

// import { getDataUri } from '../utils/functions';

class InnovationCreate extends Component {
  state = {
    datePickerOpen: false,
    partnerCCode: '',
    partnerName: '',
    partnerIndustry: '',
    partnerCity: '',
    partnerCountry: '',
    partnerDescription: '',
    innovationType: '',
    innovationName: '',
    dvOffice: '',
    dvPartner1: '',
    dvPartner2: '',
    teamGMEmail: '',
    innovationOpenDate: '',
    innovationDuration: ''
    // logo: {}, // For react-dropzone preview.
    // logoDataUri: null, // For sending to API
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

  // updateInnovationLogo = (logo) => {
  //   this.setState({ logo });
  //   getDataUri(logo.preview, (dataUri) => {
  //     this.setState({ logoDataUri: dataUri })
  //   })
  // }

  submitNewInnovation = () => {
    // Need to also send all user invites at this stage.
    console.log('state', this.state);
    console.log('Call create a new innovation action');
    const { createInnovation } = this.props;
    // TODO: Format this.state removing any null attributes. Form into a data object that can be sent to the API.
    // TODO: Sync up this.state innovation attributes with the ORM model.
    // TODO: Format moment object from date picker into UTC time for DB.
    createInnovation(this.state);
  }

  fieldsAreCompleted = () => {
      const {
        partnerCCode, partnerName, innovationType, innovationName, teamGMEmail, innovationOpenDate
      } = this.state;
      return partnerCCode && partnerName && innovationType && innovationName && innovationOpenDate && teamGMEmail;
  }

  render() {
    const fieldsAreCompleted = this.fieldsAreCompleted();
    const backButton = (
      <div className="step-back-link">
        <i className="fas fa-chevron-left"></i>
        <span className="step-back-link-text"
          onClick={() => this.props.history.goBack()}
        >Back</span>
      </div>
    );
    return (
      <div className="create-innovation-container">
        <div className="create-innovation-page-title">Create A New Innovation</div>
        {/* <UserProgressIndicator
          totalSteps={3}
          activeStep={step}
          stepTitle={stepTitles[step-1]}
        /> */}
        <div className="create-innovation-section-container">
          <CreateSectionHeader
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
          <CreateSectionHeader
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
            // innovationLogo={logo}
            // updateInnovationLogo={this.updateInnovationLogo}
          />
        </div>
        <div className="create-innovation-user-actions">
          {backButton}
          {
            fieldsAreCompleted
              ? <ButtonNext label="Save" onClick={() => this.submitNewInnovation()} />
              : <ButtonNext disabled={true} label="Complete Required Fields" />
          }
        </div>
          {/* {
            step === 3 &&
            <div>
              <InnovationAddTeam
                innovationName={innovationName}
                addNewTeamMember={this.addNewTeamMember}
                removeNewTeamMember={this.removeNewTeamMember}
                curTeamMembers={curTeamMembers}
                newTeamMembers={newTeamMembers}
                allVentureViewUsers={allUsers}
              />
              <div className="create-innovation-user-actions">
                {backButton}
                {
                  newTeamMembers.length > 0
                    ?  <ButtonNext label="Next" onClick={() => this.setState({ step: step + 1})} />
                    :  <ButtonNext label="Skip Step" onClick={() => this.setState({ step: step + 1})} />
                }
              </div>
            </div>
          } */}
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
