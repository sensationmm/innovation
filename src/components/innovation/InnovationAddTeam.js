import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/innovation-add-team.css';

class InnovationAddTeam extends Component {
  state = {
    newMemberEmail: ''
  }

  handleEnteringEmail = (e) => {
    this.setState({ newMemberEmail: e.target.value })
  }

  addNewMember = (email) => {
    const { addNewTeamMember } = this.props;
    addNewTeamMember(email);
    this.setState({ newMemberEmail: '' })
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

  render() {
    const { curTeamMembers, newTeamMembers, removeNewTeamMember, allVentureViewUsers, innovationName } = this.props;
    const { newMemberEmail } = this.state;
    const isValidEmail  = validateEmail(newMemberEmail);
    return (
      <div>
        <div className="innovation-selected-users-container">
          <div className="innovation-selected-users-description">
            <span className="innovation-add-team-subtitle">Invite team members to</span><span> {innovationName}</span></div>
          <div className="innovation-selected-users">
            {
              newTeamMembers.length > 0 &&
                newTeamMembers.map(newTeamMemberEmail => (
                  <div key={`selected-user-${newTeamMemberEmail}`} className="innovation-selected-user">
                    <div className="selected-user-email">{newTeamMemberEmail}</div>
                    <div className="remove-selected-user-icon-container" onClick={() => removeNewTeamMember(newTeamMemberEmail)}>
                      <i className="fas fa-times remove-selected-user-icon" />
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="innovation-add-user-container">
          {/* {validateEmail(newMemberEmail) && getById(ventureUsers, newUser, 'email') &&
            <div className="add-new-user-error">User already a member</div>
            // TODO: Re-implement this once we have working data.
          } */}
          <input
            type="email"
            value={newMemberEmail}
            onChange={this.handleEnteringEmail}
            onKeyPress={this.handleClickEnterKey}
            placeholder="Type to search / invite new user..."
          />
          {  isValidEmail &&
              <i onClick={() => this.addNewMember(newMemberEmail)} className="fa fa-plus add-user-icon"></i>
          }
        </div>
        <div className='innovation-all-users-list'>
          {
            allVentureViewUsers.length > 0 &&
                    allVentureViewUsers.filter(userEmail =>
                              !newTeamMembers.includes(userEmail) &&
                              !curTeamMembers.includes(userEmail) &&
                              userEmail.toLowerCase().indexOf(newMemberEmail.toLowerCase()) >= 0
                            )
                    .map(availableUserEmail => {
                      return (
                        <div
                          key={`list-${availableUserEmail}`}
                          onClick={() => this.addNewMember(availableUserEmail)}
                          className='innovation-all-users-list-item'
                        >
                          <i className="fas fa-plus add-user-icon"></i>
                          <span className="user-list-email-name">{availableUserEmail}</span>
                        </div>
                      )
                    })
          }
          {
            !allVentureViewUsers.length > 0 &&
              <div className="all-users-list-empty">
                <p>No existing users to show</p>
                <p>Enter a full email address to invite a new user</p>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default InnovationAddTeam;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
