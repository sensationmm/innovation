import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { validateEmail } from '../../utils/functions';

import '../../styles/css/innovation-add-team.css';

class InnovationAddTeam extends Component {
  state = {
    newMemberEmail: ''
  }

  handleAddingEmail = (value) => {
    this.setState({ newMemberEmail: value })
  }

  addMemberEmail = () => {
    const { newMemberEmail } = this.state;
    const { addNewTeamMember } = this.props;
    addNewTeamMember(newMemberEmail);
  }

  render() {
    const { teamMembers, newMemberEmail } = this.props;
    return (
      <div>
        <h1>Innovation Add Team</h1>
        <div>
          {
            teamMembers.map(member => (
              <h3>{member}</h3>
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
          {/* {validateEmail(newMemberEmail) && !getById(ventureUsers, newUser, 'email') &&
            <i className="fas fa-2x fa-envelope register-icon" onClick={this.registerUser} />
            // TODO
          } */}
          <i onClick={this.addMemberEmail} className="fa fa-user-plus add-user-icon"></i>
        </div>
      </div>
    )
  }
}

export default InnovationAddTeam;

// InnovationAddTeam.propTypes = {
//   // TODO.
// }
