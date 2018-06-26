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

import { createInnovation } from '../actions/innovations';

// TODO: get these users from the API.
const allUsers = [ 'a@notinn.com', 'b@notinn.com', 'c@notinn.com', 'd@notinn.com', 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const curInnovationUsers = [ 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];

class InnovationCreate extends Component {
  state = {
    step: 2,
    innovationName: '',
    logo: {},
    curTeamMembers: curInnovationUsers,
    newTeamMembers: [],
    keyDates: [],
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
      const { keyDates } = this.state;
      // TODO: Check for presence of all of the required keyDates (IS1 -> 3)
      return keyDates.length >= 3;
    }
    if (step === 4) {
      const { opportunityAreas } = this.state;
      return opportunityAreas.length >= 1;
    }
  }

  render() {
    const { step, innovationName, logo, curTeamMembers, newTeamMembers, keyDates, opportunityAreas } = this.state;
    const fieldsCompleted = this.fieldsCompleted();
    return (
      <div>
        <h1>Create Innovation</h1>
        <div className="process-step-count-container">
          <div className={step === 1 ? 'process-step-count active' : 'process-step-count'}>1</div>
          <div className={step === 2 ? 'process-step-count active' : 'process-step-count'}>2</div>
          <div className={step === 3 ? 'process-step-count active' : 'process-step-count'}>3</div>
          <div className={step === 4 ? 'process-step-count active' : 'process-step-count'}>4</div>
        </div>
        <div>
          {
            step === 1 &&
              <InnovationAddDetails
                innovationName={innovationName}
                updateInnovationName={this.updateDetails}
                innovationLogo={logo}
                updateInnovationLogo={this.updateInnovationLogo}
              />
          }
          {
            step === 2 &&
            <div>
              <InnovationAddTeam
                addNewTeamMember={this.addNewTeamMember}
                removeNewTeamMember={this.removeNewTeamMember}
                curTeamMembers={curTeamMembers}
                newTeamMembers={newTeamMembers}
                allVentureViewUsers={allUsers}
              />
              {
                newTeamMembers.length > 0
                  // TODO: Save the users within the innovation with a status of invited, once they join this can be updated.
                  ?  <ButtonSubmit label="Send Invites" onClick={this.sendNewMemberInvites} />
                  :  <ButtonSubmit label="Skip Step" onClick={() => this.setState({ step: step + 1})} />
              }
            </div>
          }
          {
            step === 3 &&
              <InnovationAddDates></InnovationAddDates>
          }
          {
            step === 4 &&
            <div>
              <InnovationAddAreas></InnovationAddAreas>
              <ButtonSubmit disabled={!fieldsCompleted} label="Complete" onClick={this.submitNewInnovation} />
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
