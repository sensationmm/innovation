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

class InnovationCreate extends Component {
  state = {
    step: 2,
    innovationName: '',
    logo: {},
    teamMembers: ['test1@test1.com', 'test2@test2.com'],
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
    console.log('addNewTeamMember email', email);
    const { teamMembers } = this.state;
    this.setState({ teamMembers: [ ...teamMembers, email ] })
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
    if (step === 2) {
      const { teamMembers } = this.state;
      return teamMembers.length >= 1;
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
    const { step, innovationName, logo, teamMembers, keyDates, opportunityAreas } = this.state;
    const fieldsCompleted = this.fieldsCompleted();
    console.log('innovation create state', this.state);
    return (
      <div>
        <h1>Create Innovation</h1>
        <div style={{display: 'flex'}}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
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
              <InnovationAddTeam
                addNewTeamMember={this.addNewTeamMember}
                teamMembers={teamMembers}
              />
          }
          {
            step === 3 &&
              <InnovationAddDates></InnovationAddDates>
          }
          {
            step === 4 &&
              <InnovationAddAreas></InnovationAddAreas>
          }
          {
            step === 4
              ? <ButtonSubmit disabled={!fieldsCompleted} label="Complete" onClick={this.submitNewInnovation} />
              : <ButtonSubmit disabled={!fieldsCompleted} label="Next Step" onClick={() => this.setState({ step: step + 1})} />
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
