import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddPartner from '../components/innovation/InnovationAddPartner';
import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationAddDates from '../components/innovation/InnovationAddDates';
import UserProgressIndicator from '../components/UserProgressIndicator';

import ButtonNext from '../components/buttons/ButtonNext';

import '../styles/css/innovation-create.css';

import { createInnovation } from '../actions/innovations';

import { getDataUri } from '../utils/functions';

// TODO: get data from the API or from config
const allUsers = [ 'a@notinn.com', 'b@notinn.com', 'c@notinn.com', 'd@notinn.com', 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const curInnovationUsers = [ 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const keyDates = [
  {id: 1, name: 'Ideation', date: null, type: 'required'},
  {id: 2, name: 'IS1', date: null, type: 'required'},
  {id: 3, name: 'IS2', date: null, type: 'required'},
  {id: 4, name: 'IS3', date: null, type: 'required'}
]

const stepTitles = ['Corporate Partner Details', 'Innovation Sprint Details', 'Assign GM']

class InnovationCreate extends Component {
  state = {
    step: 2,
    datePickerOpen: false,
    partnerCCode: null,
    partnerIndustry: null,
    partnerCity: null,
    partnerCountry: null,
    partnerDescription: null,
    innovationName: null,
    innovationName: null,
    dvOffice: null,
    dvPartner1: null,
    dvPartner2: null,
    innovationOpenDate: null,
    innovationDuration: null
    // logo: {}, // For react-dropzone preview.
    // logoDataUri: null, // For sending to API
    // curTeamMembers: curInnovationUsers,
    // newTeamMembers: [],
    // innovationKeyDates: keyDates
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  toggleDatePicker = () => {
    this.setState({ datePickerOpen: !this.state.datePickerOpen });
  }

  updateInnovationLogo = (logo) => {
    this.setState({ logo });
    getDataUri(logo.preview, (dataUri) => {
      this.setState({ logoDataUri: dataUri })
    })
  }

  addNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: [ ...newTeamMembers, email ] })
  }

  removeNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: newTeamMembers.filter(teamMember => teamMember !== email) })
  }

  createNewKeyDate = (id, name, date) => {
    const { innovationKeyDates } = this.state;
    this.setState({ innovationKeyDates:  [ ...innovationKeyDates, { id, name, date, type: 'custom' } ] })
  }

  editKeyDate = (keyDateId, key, value) => {
    const { innovationKeyDates } = this.state;
    const keyDatesCopy = [ ...innovationKeyDates ];
    const indexToUpdate = keyDatesCopy.findIndex(keyDate => keyDate.id === keyDateId);
    if (indexToUpdate > -1) {
      keyDatesCopy[indexToUpdate][key] = value;
      this.setState({ innovationKeyDates: keyDatesCopy })
    }
  }

  deleteKeyDate = (keyDateId) => {
    const { innovationKeyDates } = this.state;
    const newKeyDates = innovationKeyDates.filter(keyDate => keyDate.id !== keyDateId);
    this.setState({ innovationKeyDates: newKeyDates })
  }

  submitNewInnovation = () => {
    // Need to also send all user invites at this stage.
    console.log('state', this.state);
    console.log('Call create a new innovation action');
    const { createInnovation } = this.props;
    createInnovation(this.state);
  }

  fieldsAreCompleted = () => {
    const { step } = this.state;
    if (step === 1) {
      const { partnerCCode, partnerIndustry, partnerCity, partnerCountry, partnerDescription } = this.state;
      return partnerCCode && partnerIndustry && partnerCity && partnerCountry && partnerDescription;
    }
    if (step === 2) {
      const { innovationName } = this.state;
      return innovationName;
    }
    if (step === 3) {
      const { innovationKeyDates } = this.state;
      const requiredKeyDates = innovationKeyDates.filter(keyDate => keyDate.type === 'required')
      return requiredKeyDates.length >= 4 && requiredKeyDates.every(keyDate => keyDate.date);
    }
  }

  render() {
    const { step } = this.state;
    const fieldsAreCompleted = this.fieldsAreCompleted();
    const backButton = (
      <div className="step-back-link">
        <i className="fas fa-chevron-left"></i>
        <span className="step-back-link-text"
          onClick={
            step === 1
              ? () => this.props.history.goBack()
              : () => this.setState({ step: step - 1})
          }
        >{step === 1 ? 'Cancel' : 'Back'}</span>
      </div>
    );
    return (
      <div>
        <div className="create-innovation-page-title">Create A New Innovation</div>
        <UserProgressIndicator
          totalSteps={3}
          activeStep={step}
          stepTitle={stepTitles[step-1]}
        />
        <div>
          {
            step === 1 &&
            <div>
              <InnovationAddPartner
                updateFormField={this.updateFormField}
                partnerCCode={this.state.partnerCCode}
                partnerIndustry={this.state.partnerIndustry}
                partnerCity={this.state.partnerCity}
                partnerCountry={this.state.partnerCountry}
                partnerDescription={this.state.partnerDescription}
              />
              <div className="create-innovation-user-actions">
                {backButton}
                {
                  fieldsAreCompleted
                    ? <ButtonNext label="Next" onClick={() => this.setState({ step: step + 1 })} />
                    : <ButtonNext disabled={true} label="Enter Required Details" />
                }
              </div>
            </div>
          }
          {
            step === 2 &&
            <div>
              <InnovationAddDetails
                updateFormField={this.state.updateFormField}
                innovationName={this.state.innovationName}
                dvOffice={this.state.dvOffice}
                dvPartner1={this.state.dvPartner1}
                dvPartner2={this.state.dvPartner2}
                innovationOpenDate={this.state.innovationOpenDate}
                innovationDuration={this.state.innovationDuration}
                datePickerOpen={this.state.datePickerOpen}
                toggleDatePicker={this.toggleDatePicker}
                // innovationLogo={logo}
                // updateInnovationLogo={this.updateInnovationLogo}
              />
              <div className="create-innovation-user-actions">
                {backButton}
                {
                  fieldsAreCompleted
                    ? <ButtonNext label="Next" onClick={() => this.setState({ step: step + 1 })} />
                    : <ButtonNext disabled={true} label="Enter Some Details" />
                }
              </div>
            </div>
          }
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
          {/* {
            step === 3 &&
            <div>
              <InnovationAddDates
                innovationKeyDates={innovationKeyDates}
                createNewKeyDate={this.createNewKeyDate}
                editKeyDate={this.editKeyDate}
                deleteKeyDate={this.deleteKeyDate}
              />
              <div className="create-innovation-user-actions">
                {backButton}
                {
                  fieldsAreCompleted
                    ? <ButtonNext label="Complete Setup" onClick={this.submitNewInnovation} />
                    : <ButtonNext disabled={true} label="Enter Required Dates" />
                }
              </div>
            </div>
          } */}
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
