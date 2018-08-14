import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonSubmit from '../buttons/ButtonSubmit';
import ButtonCancel from '../buttons/ButtonCancel';

import { inviteInnovationUsers } from '../../actions/users';
import { validateEmail } from '../../utils/functions';

import '../../styles/css/innovation-add-team.css';

class InnovationAddTeam extends Component {
  state = {
    newMemberEmail: '',
    newTeamMembers: []
  }

  handleEnteringEmail = (e) => {
    this.setState({ newMemberEmail: e.target.value })
  }

  handleClickEnterKey = (e) => {
    if (e.key === 'Enter') {
      const { newMemberEmail } = this.state;
      const isValidEmail  = validateEmail(newMemberEmail);
      if (isValidEmail) {
        this.addNewMember(newMemberEmail);
      }
    }
  }

  addNewMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: [ ...newTeamMembers, email ], newMemberEmail: '' })
  }

  removeNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: newTeamMembers.filter(teamMember => teamMember !== email) })
  }

  saveNewTeamMembers = () => {
    const { inviteInnovationUsers, partnerId } = this.props;
    inviteInnovationUsers(partnerId, this.state.newTeamMembers, 'member');
  }

  // onSave is optional save button overwrite. Same with onCancel.
  render() {
    const { newMemberEmail, newTeamMembers } = this.state;
    const { onSave, onCancel, allInventureUsers, curTeamMembers } = this.props;
    const isValidEmail  = validateEmail(newMemberEmail);
    return (
      <div>
        {
          newTeamMembers.length > 0 &&
            <div className="innovation-selected-users-container">
              <div className="innovation-selected-users">
                {
                  newTeamMembers.map(newTeamMemberEmail => (
                    <div key={`selected-user-${newTeamMemberEmail}`} className="innovation-selected-user">
                      <div className="selected-user-email">{newTeamMemberEmail}</div>
                      <div className="remove-selected-user-icon-container" onClick={() => this.removeNewTeamMember(newTeamMemberEmail)}>
                        <i className="fas fa-times remove-selected-user-icon" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        }
        <div className="innovation-add-user-container">
          <input
            type="email"
            value={newMemberEmail}
            onChange={this.handleEnteringEmail}
            onKeyPress={this.handleClickEnterKey}
            placeholder="Type in an email..."
          />
          {  isValidEmail &&
              <i onClick={() => this.addNewMember(newMemberEmail)} className="fa fa-plus add-user-icon right-align"></i>
          }
        </div>
        {
          allInventureUsers &&
            <div className={classnames('innovation-all-users-list', { 'hidden': newMemberEmail.length < 3 })}>
              {
                allInventureUsers && allInventureUsers.length > 0 &&
                        allInventureUsers.filter(({ email }) =>
                                  !newTeamMembers.map(member => member.email).includes(email) &&
                                  !curTeamMembers.map(member => member.email).includes(email) &&
                                  email.toLowerCase().indexOf(newMemberEmail.toLowerCase()) >= 0
                                )
                        .map(availableUser => {
                          return (
                            <div
                              key={`list-${availableUser.email}`}
                              onClick={() => this.addNewMember(availableUser.email)}
                              className='innovation-all-users-list-item'
                            >
                              <i className="fas fa-plus add-user-icon left-align"></i>
                              <span className="user-list-email-name">{availableUser.email}</span>
                            </div>
                          )
                        })
              }
            </div>
        }
        <div className="create-innovation-user-actions">
          <ButtonCancel
            onClick={onCancel}
          />
          <ButtonSubmit
            label="Send Invites"
            onClick={onSave ? () => onSave() : () => this.saveNewTeamMembers()}
            disabled={!this.state.newTeamMembers.length > 0}
          />
        </div>
      </div>
    )
  }
}

InnovationAddTeam.propTypes = {
  partnerId: PropTypes.string,
  curTeamMembers: PropTypes.array,
  allInventureUsers: PropTypes.array,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  inviteInnovationUsers: PropTypes.func,
  history: PropTypes.func
}

const mapStateToProps = state => ({
  curTeamMembers: state.users.activeInnovationUsers,
  allInventureUsers: state.users.inVentureUsers
});

const actions = { inviteInnovationUsers };

export default connect(mapStateToProps, actions)(InnovationAddTeam);
