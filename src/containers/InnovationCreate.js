import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationAddDates from '../components/innovation/InnovationAddDates';

import ButtonInnovationNext from '../components/buttons/ButtonInnovationNext';

import '../styles/css/innovation-create.css';

import { createInnovation } from '../actions/innovations';

// TODO: get data from the API or from config
const allUsers = [ 'a@notinn.com', 'b@notinn.com', 'c@notinn.com', 'd@notinn.com', 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const curInnovationUsers = [ 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const keyDates = [
  {id: 1, name: 'Ideation', date: '', type: 'required'},
  {id: 2, name: 'IS1', date: '', type: 'required'},
  {id: 3, name: 'IS2', date: '', type: 'required'},
  {id: 4, name: 'IS3', date: '', type: 'required'},
  {id: 5, name: 'Custom1', date: moment('01/01/2000'), type: 'custom'}
]

class InnovationCreate extends Component {
  state = {
    step: 3,
    innovationName: '',
    logo: {},
    curTeamMembers: curInnovationUsers,
    newTeamMembers: [],
    innovationKeyDates: keyDates
  }

  updateDetails = (key, value) => {
    this.setState({ [key]: value })
  }

  updateInnovationLogo = (logo) => {
    this.setState({ logo });
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
    console.log('Call create a new innovation action');
  }

  fieldsCompleted = () => {
    const { step } = this.state;
    if (step === 1) {
      const { innovationName, logo } = this.state;
      return innovationName && logo;
    }
    if (step === 3) {
      const { innovationKeyDates } = this.state;
      const requiredKeyDates = innovationKeyDates.filter(keyDate => keyDate.type === 'required')
      // TODO: Check for presence of all of the required keyDates (IS1 -> 3)
      return requiredKeyDates.length >= 4 && requiredKeyDates.every(keyDate => keyDate.date);
    }
  }

  render() {
    const { step, innovationName, logo, curTeamMembers, newTeamMembers, innovationKeyDates, opportunityAreas } = this.state;
    const fieldsCompleted = this.fieldsCompleted();
    const backButton = (
      <div className="step-back-link">
        <i className="fas fa-chevron-left"></i>
        <span className="step-back-link-text" onClick={() => this.setState({ step: step - 1})}>Back</span>
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
                <ButtonInnovationNext label="Next" onClick={() => this.setState({ step: step + 1})} />
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
                    ?  <ButtonInnovationNext label="Next" onClick={() => this.setState({ step: step + 1})} />
                    :  <ButtonInnovationNext label="Skip Step" onClick={() => this.setState({ step: step + 1})} />
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
                  fieldsCompleted
                    ? <ButtonInnovationNext label="Complete Setup" onClick={this.submitNewInnovation} />
                    : <ButtonInnovationNext disabled={true} label="Enter Required Dates" />
                }
              </div>
            </div>
          }
        </div>

      </div>
    )
  }
}

// CreateInnovation.propTypes = {
//  // TODO
// };
//
// const mapStateToProps = state => ({
//   // TODO
// });
//
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createInnovation
  }, dispatch
);

export default connect(mapDispatchToProps, null)(InnovationCreate);
