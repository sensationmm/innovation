import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddDates from '../components/innovation/InnovationAddDates';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import CorporatePartnerSummary from '../components/innovation/CorporatePartnerSummary';
import InnovationTeam from '../components/innovation/InnovationTeam';
import FormSectionHeader from '../components/layout/FormSectionHeader';
import FormTextArea from '../components/layout/FormTextArea';
import ContentBox from '../components/layout/ContentBox';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/innovation-create.css';

import { editInnovation } from '../actions/innovations';
import { keyDatesOptions } from '../config/innovationOptions';

const curTeamMembers = [
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Stavros', position: 'GM'}, {name: 'Barry', position: 'VA'},
  {name: 'Clem', position: 'SD'}, {name: 'Geraldine', position: 'Engineer'}
];
const allUsers = ['dv1Personx', 'dv1Persony', 'dv1Personz', 'dv2Personx', 'dv3Personx', 'dv4Person', 'dv5Person', 'dv6Person', ];

class InnovationUpdate extends Component {
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
    return (
      <div className="create-innovation-container">
        <div className="create-innovation-welcome">
          Please enter the IS dates, team members and innovation mandate
        </div>
        <div className="create-innovation-section-container">
          <FormSectionHeader
            title='Corporate Partner Summary'
          />
          <ContentBox>
            <CorporatePartnerSummary />
          </ContentBox>
        </div>
        <div className="create-innovation-section-container">
          <FormSectionHeader
            title='Enter Immersion Session Key Dates'
            subtitle='These are required to create your innovation timeline, you can edit these later if you need to'
          />
          <InnovationAddDates
            innovationKeyDates={this.state.innovationKeyDates}
            createNewKeyDate={this.createNewKeyDate}
            editKeyDate={this.editKeyDate}
            deleteKeyDate={this.deleteKeyDate}
          />
        </div>
        <div className="create-innovation-section-container">
          <FormSectionHeader
            title='Your Current Team'
          />
          <InnovationTeam
            teamMembers={curTeamMembers}
          />
        </div>

        <div className="create-innovation-section-container">
          <FormSectionHeader
            title="Add New Team Members"
            subtitle="Invites will be sent to new team members when you save"
          />
          <InnovationAddTeam
            addNewTeamMember={this.addNewTeamMember}
            removeNewTeamMember={this.removeNewTeamMember}
            curTeamMembers={curTeamMembers}
            newTeamMembers={this.state.newTeamMembers}
            allVentureViewUsers={allUsers}
          />
        </div>
        <div className="create-innovation-section-container">
          <FormSectionHeader
            title="Innovation Mandate"
            subtitle="What is the focus? Who is the champion? CEO or middle management?"
          />
          <FormTextArea
            id="innovationMandate"
            placeholder="What is your innovation mandate?"
            onChange={this.updateFormField}
            value={this.state.innovationMandate}
          />
        </div>
        <div className="create-innovation-user-actions">
          <BackTextLink
            label="Back"
            onClick={() => this.props.history.goBack()}
          />
          <ButtonSubmit
            label="Save"
            onClick={() => this.updateInnovation()}
          />
        </div>
      </div>
    )
  }
}

InnovationUpdate.propTypes = {
  history: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  editInnovation: bindActionCreators(editInnovation, dispatch)
});

export default connect(null, mapDispatchToProps)(InnovationUpdate);
