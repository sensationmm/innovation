import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationAddDates from '../components/innovation/InnovationAddDates';

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

class InnovationCreate extends Component {
  state = {
    step: 1,
    innovationName: '',
    logo: {}, // For react-dropzone preview.
    logoDataUri: null, // For sending to API
    curTeamMembers: curInnovationUsers,
    newTeamMembers: [],
    innovationKeyDates: keyDates
  }

  updateDetails = (key, value) => {
    this.setState({ [key]: value })
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
    const { step, innovationName, logo, curTeamMembers, newTeamMembers, innovationKeyDates } = this.state;
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
        <div className="create-innovation-page-title">Create Innovation</div>
        <div className="process-step-count-container">
          <div className={step === 1 ? 'process-step-count active' : 'process-step-count'}>1</div>
          <div className={step === 2 ? 'process-step-count active' : 'process-step-count'}>2</div>
          <div className={step === 3 ? 'process-step-count active' : 'process-step-count'}>3</div>
        </div>
        <div>
          {
            step === 1 &&
            <div>
              <InnovationAddDetails
                innovationName={innovationName}
                updateInnovationName={this.updateDetails}
                innovationLogo={logo}
                updateInnovationLogo={this.updateInnovationLogo}
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
          {
            step === 2 &&
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
          }
          {
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

const mapDispatchToProps = dispatch => ({
  createInnovation: bindActionCreators(createInnovation, dispatch)
});

export default connect(null, mapDispatchToProps)(InnovationCreate);