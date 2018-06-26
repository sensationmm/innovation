import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/innovation-add-team.css';

class InnovationAddTeam extends Component {
  state = {
    newMemberEmail: ''
  }

  handleAddingEmail = (e) => {
    this.setState({ newMemberEmail: e.target.value })
  }

  addMemberViaEmailInput = (email) => {
    const { addNewTeamMember } = this.props;
    addNewTeamMember(email);
    this.setState({ newMemberEmail: '' })
  }

  render() {
    const { curTeamMembers, newTeamMembers, addNewTeamMember, removeNewTeamMember, allVentureViewUsers } = this.props;
    const { newMemberEmail } = this.state;
    const isValidEmail  = validateEmail(newMemberEmail);
    return (
      <div>
        <div>
          <div>Current Team members</div>
          <div style={{ display: 'flex' }} >
          {
            curTeamMembers.map(member => (
              <span key={member} style={{ padding: '5px' }}>{member}</span>
            ))
          }
          </div>
        </div>
        { newTeamMembers.length > 0 &&
          <div className="innovation-selected-users">
            {
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
        }
        <div className="innovation-add-user-container">
          {/* {validateEmail(newMemberEmail) && getById(ventureUsers, newUser, 'email') &&
            <div className="add-new-user-error">User already a member</div>
            // TODO
          } */}
          <input
            type="email"
            value={newMemberEmail}
            onChange={this.handleAddingEmail}
            placeholder="Type to search / invite new user..."
          />
          {  isValidEmail &&
              <i onClick={() => this.addMemberViaEmailInput(newMemberEmail)} className="fa fa-user-plus add-user-icon"></i>
          }
        </div>
        <div className='innovation-all-users-list'>
          {
            allVentureViewUsers.length > 0 &&
                    allVentureViewUsers.filter(userEmail =>
                              !newTeamMembers.includes(userEmail) &&
                              !curTeamMembers.includes(userEmail)
                            )
                    .map(availableUserEmail => {
                      return (
                        <div key={`list-${availableUserEmail}`} onClick={() => addNewTeamMember(availableUserEmail)} className='innovation-all-users-list-item'>
                          <i className="fas fa-plus"></i>
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
