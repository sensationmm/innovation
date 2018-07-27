import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import InnovationAddDates from '../components/innovation/keydates/InnovationAddDates';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationTeam from '../components/innovation/InnovationTeam';
import FormSectionHeader from '../components/formInputs/FormSectionHeader';
import FormTextArea from '../components/formInputs/FormTextArea';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/innovation-create.css';

import { editInnovation } from '../actions/innovations';
import { keyDatesOptions } from '../config/innovationOptions';
import { removeNullValueAttrs } from '../utils/functions';

import { requiredKeyDates } from  '../config/innovationOptions';

class InnovationUpdate extends Component {
  state = {
    innovationKeyDates: [],
    newTeamMembers: [],
    innovationMandate: ''
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  // TODO.
  // updateTeamMembers = () => {
  //   const { editInnovation, innovationId } = this.props;
  //
  //   inviteTeamMembers(innovationId, attrsToUpdate)
  // }

  // updateMandate = () => {
  //   const { editInnovation, innovationId } = this.props;
  //
  //   editInnovation(innovationId, attrsToUpdate)
  // }

  render() {
    const { openEditDates, openEditTeam, openEditMandate } = this.props;
    console.log(this.state);
    return (
      <div className="create-innovation-container">
        {
          openEditDates &&
            <div className="create-innovation-section-container">
              <FormSectionHeader
                title='Enter Immersion Session Key Dates'
                subtitle='These are required to create your innovation timeline, you can edit these later if you need to'
              />
              <InnovationAddDates />
            </div>
        }
        {
          openEditTeam &&
            <div>
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
            </div>
        }
        {
          openEditMandate &&
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
        }

        <div className="create-innovation-user-actions">
          <ButtonSubmit
            label="Save"
            onClick={() => this.updateKeyDates()} // TODO. Conditional on which module is open.
          />
        </div>
      </div>
    )
  }
}

InnovationUpdate.propTypes = {
  history: PropTypes.object,
  editInnovation: PropTypes.func,
  editKeyDates: PropTypes.func,
  openEditDates: PropTypes.bool,
  openEditTeam: PropTypes.bool,
  openEditMandate: PropTypes.bool,
  innovationId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const mapStateToProps = state => ({
  keyDates: state.innovations.activeInnovation.keyDates,
  teamMembers: state.innovations.activeInnovation.teamMembers,
  mandate: state.innovations.activeInnovation.mandate
});

const actions = { editInnovation, editKeyDates };

export default connect(mapStateToProps, actions)(InnovationUpdate);
