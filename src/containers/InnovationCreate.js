import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationAddDates from '../components/innovation/InnovationAddDates';
import InnovationAddAreas from '../components/innovation/InnovationAddAreas';

import ButtonSubmit from '../components/buttons/ButtonSubmit';

import '../styles/css/innovation-create.css';

import { createInnovation } from '../actions/innovations';

// TODO: get data from the API or from config
const allUsers = [ 'a@notinn.com', 'b@notinn.com', 'c@notinn.com', 'd@notinn.com', 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const curInnovationUsers = [ 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const requiredKeyDates = [
  {id: 1, name: 'Ideation', date: ''},
  {id: 2, name: 'IS1', date: ''},
  {id: 3, name: 'IS2', date: ''},
  {id: 4, name: 'IS3', date: ''}
]

class InnovationCreate extends Component {
  state = {
    step: 3,
    innovationName: '',
    logo: {},
    curTeamMembers: curInnovationUsers,
    newTeamMembers: [],
    requiredKeyDates: requiredKeyDates,
    customKeyDates: [],
    opportunityAreas: []
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

  sendNewMemberInvites = () => {
    const { newTeamMembers, step } = this.state;
    // TODO: Loop through all new members and make api call to send invites to all of them.
    this.setState({ step: step + 1})
  }

  editKeyDate = (id, key, value) => {
    console.log(id, key, value);
  }

  submitNewInnovation = () => {
    console.log('Call create a new innovation action');
  }

  fieldsCompleted = () => {
    const { step } = this.state;
    if (step === 1) {
      const { innovationName, logo } = this.state;
      return innovationName && logo;
    }
    if (step === 3) {
      const { requiredKeyDates } = this.state;
      // TODO: Check for presence of all of the required keyDates (IS1 -> 3)
      return requiredKeyDates.length >= 4;
    }
    if (step === 4) {
      const { opportunityAreas } = this.state;
      return opportunityAreas.length >= 1;
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
          <div className={step === 4 ? 'process-step-count active' : 'process-step-count'}>4</div>
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
                <ButtonSubmit label="Next" onClick={() => this.setState({ step: step + 1})} />
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
                    // TODO: Save the users within the innovation with a status of invited, once they join this can be updated.
                    ?  <ButtonSubmit label="Send Invites" onClick={this.sendNewMemberInvites} />
                    :  <ButtonSubmit label="Skip Step" onClick={() => this.setState({ step: step + 1})} />
                }
              </div>
            </div>
          }
          {
            step === 3 &&
            <div>
              <InnovationAddDates
                requiredKeyDates={requiredKeyDates}
                innovationKeyDates={innovationKeyDates}
                editKeyDate={this.editKeyDate}
              />
              <div className="create-innovation-user-actions">
                {backButton}
                <ButtonSubmit label="Next" onClick={() => this.setState({ step: step + 1})} />
              </div>
            </div>
          }
          {
            step === 4 &&
            <div>
              <InnovationAddAreas></InnovationAddAreas>
              <div className="create-innovation-user-actions">
                {backButton}
                <ButtonSubmit disabled={!fieldsCompleted} label="Complete" onClick={this.submitNewInnovation} />
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
