import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddDates from '../components/innovation/InnovationAddDates';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import CreateSectionHeader from '../components/innovation/CreateSectionHeader';
import CorporatePartnerSummary from '../components/innovation/CorporatePartnerSummary';
import InnovationTeam from '../components/innovation/InnovationTeam';
import ContentBox from '../components/layout/ContentBox';
import ButtonNext from '../components/buttons/ButtonNext';

import '../styles/css/innovation-create.css';

import { editInnovation } from '../actions/innovations';
import { keyDatesOptions } from '../config/innovationOptions';

const curTeamMembers = [{name: 'Stavros', position: 'GM'}, {name: 'Barry', position: 'VA'}, {name: 'Clem', position: 'SD'}];
const allUsers = ['dv1', 'dv2', 'dv3'];

class InnovationComplete extends Component {
  state = {
    innovationKeyDates: keyDatesOptions,
    newTeamMembers: [],
    innovationMandate: ''
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

  addNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: [ ...newTeamMembers, email ] })
  }

  removeNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: newTeamMembers.filter(teamMember => teamMember !== email) })
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  updateInnovation = () => {
    console.log('updating innovation with', this.state);
  }

  render() {
    const { innovationKeyDates, newTeamMembers } = this.state;
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
        <div className="create-innovation-welcome">
          Hi xxxxx, you've been assigned as GM for this project. We just need a few details from you:
        </div>
        <div className="create-innovation-section-container">
          <CreateSectionHeader
            title='Corporate Partner Summary'
          />
          <ContentBox>
            <CorporatePartnerSummary />
          </ContentBox>
        </div>
        <div className="create-innovation-section-container">
          <CreateSectionHeader
            title='Enter Immersion Session Key Dates'
            subtitle='These are required to create your innovation timeline, you can edit these later if you need to'
          />
          <InnovationAddDates
            innovationKeyDates={innovationKeyDates}
            createNewKeyDate={this.createNewKeyDate}
            editKeyDate={this.editKeyDate}
            deleteKeyDate={this.deleteKeyDate}
          />
        </div>
        <div className="create-innovation-section-container">
          <CreateSectionHeader
            title='Your Current Team'
          />
          <InnovationTeam
            teamMembers={curTeamMembers}
          />
        </div>

        <div className="create-innovation-section-container">
          <CreateSectionHeader
            title="Add New Team Members"
            subtitle="Invites will be sent to new members when you save"
          />
          <InnovationAddTeam
            addNewTeamMember={this.addNewTeamMember}
            removeNewTeamMember={this.removeNewTeamMember}
            curTeamMembers={curTeamMembers}
            newTeamMembers={newTeamMembers}
            allVentureViewUsers={allUsers}
          />
        </div>
        <div className="create-innovation-section-container">
          <CreateSectionHeader
            title="Innovation Mandate"
          />
          <div className="create-innovation-textinput">
            <textarea
              type="text"
              id="innovationMandate"
              placeholder="What is your innovation mandate?"
              onChange={this.updateFormField}
              value={this.state.innovationMandate}
            />
          </div>
        </div>
        <div className="create-innovation-user-actions">
          {backButton}
          {
            true
              ? <ButtonNext label="Save" onClick={this.submitNewInnovation} />
              : <ButtonNext disabled={true} label="Enter Required Details" />
          }
        </div>
      </div>
    )
  }
}

InnovationComplete.propTypes = {

}

const mapDispatchToProps = dispatch => ({
  editInnovation: bindActionCreators(editInnovation, dispatch)
});

export default connect(null, mapDispatchToProps)(InnovationComplete);
