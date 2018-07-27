import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonSubmit from '../buttons/ButtonSubmit';
import BackTextLink from '../buttons/BackTextLink';

import { inviteInnovationUsers } from '../../actions/users';
import { validateEmail } from '../../utils/functions';

import '../../styles/css/innovation-add-team.css';

const curTeamMembers = [
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Stavros', position: 'GM'}, {name: 'Barry', position: 'VA'},
  {name: 'Clem', position: 'SD'}, {name: 'Geraldine', position: 'Engineer'}
];

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
    // TODO: Get curTeamMembers from partner.users in state
    const { newMemberEmail, newTeamMembers } = this.state;
    const { onSave, onCancel, partnerId, allUsers } = this.props;
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
          allUsers &&
            <div className={classnames('innovation-all-users-list', { 'hidden': newMemberEmail.length < 3 })}>
              {
                allUsers && allUsers.length > 0 &&
                        allUsers.filter(({ email }) =>
                                  !newTeamMembers.includes(email) &&
                                  !curTeamMembers.includes(email) &&
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
              {
                allUsers && !allUsers.length > 0 &&
                  <div className="all-users-list-empty">
                    <p>No existing users to show</p>
                    <p>Enter a full email address to invite a new user</p>
                  </div>
              }
            </div>
        }
        <div className="create-innovation-user-actions">
          <BackTextLink
            label="Cancel"
            onClick={onCancel ? () => onCancel() : () => this.props.history.goBack()}
            textColor='black'
          />
          <ButtonSubmit
            label="Save"
            onClick={onSave ? () => onSave() : () => this.saveNewTeamMembers()}
          />
        </div>
      </div>
    )
  }
}

InnovationAddTeam.propTypes = {
  partnerId: PropTypes.string,
  teamMembers: PropTypes.array,
  allUsers: PropTypes.array,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

const mapStateToProps = state => ({
  teamMembers: state.users.activeInnovationUsers,
  allUsers: state.users.inVentureUsers
});

const actions = { inviteInnovationUsers };

export default connect(mapStateToProps, actions)(InnovationAddTeam);
