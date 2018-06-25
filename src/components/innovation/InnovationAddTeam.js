import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/innovation-add-team.css';

// TODO: get these users from the API.
const allUsers = [ 'a@a.com', 'b@b.com', 'c@c.com', 'd@d.com', 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];
const curInnovationUsers = [ 'a@inn.com', 'b@inn.com', 'c@inn.com', 'd@inn.com' ];

class InnovationAddTeam extends Component {
  state = {
    newMemberEmail: '',
    selectedUsers: [] // Users that are currently selected from the list of all venture-view users.
  }

  handleAddingEmail = (e) => {
    this.setState({ newMemberEmail: e.target.value })
  }

  addMemberEmail = () => {
    const { newMemberEmail, selectedUsers } = this.state;
    const { addNewTeamMember } = this.props;
    console.log('newMemberEmail', newMemberEmail);
    addNewTeamMember(newMemberEmail);
    this.setState({
      newMemberEmail: '',
      selectedUsers: [ ...selectedUsers, newMemberEmail ]
    })
  }

  render() {
    const { teamMembers } = this.props;
    const { newMemberEmail, selectedUsers } = this.state;
    const isValidEmail  = validateEmail(newMemberEmail);
    console.log('teamMembers', teamMembers);
    return (
      <div>
        <div>
          {
            teamMembers.map(member => (
              <h3 key={member}>{member}</h3>
            ))
          }
        </div>
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
              <i onClick={this.addMemberEmail} className="fa fa-user-plus add-user-icon"></i>
          }
        </div>
        <div className='all-venture-view-users'>
          {
            console.log(allUsers)
          }
          {
            allUsers.filter(userEmail => !allUsers.includes(userEmail))
                    .map(newUserEmail => {
                      console.log('filtered user email', newUserEmail);
                      const userSelected = selectedUsers.includes(newUserEmail);
                      return (
                        <div className='venture-all-users-list'>
                          <div className={classnames('check-mark', {'selected': userSelected})}>
                            {userSelected && <i className="fas fa-check"></i>}
                          </div>
                          {newUserEmail}
                        </div>
                      )
                    })
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
