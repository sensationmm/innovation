import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from '../formInputs/Dropdown';

import '../../styles/css/innovation-team.css';

import { userSetRole } from '../../actions/users';

class InnovationTeam extends Component {

  handleChangeRole = (e) => {
    const { userSetRole } = this.props;
    userSetRole(e.target.id, e.target.value);
  }

  render() {
    const { teamMembers } = this.props;
    return (
      <div>
        <div className="innovation-team-container-display">
        {
          teamMembers && teamMembers.map((teamMember, index) => (
            <div key={`${index}-${teamMember.name}`} className="innovation-team-member">
              <div>
                {
                  teamMember.name
                    ? <div>{teamMember.name}</div>
                    : <div className="innovation-team-user-pending">REGISTRATION PENDING</div>
                }
                <div>{teamMember.email}</div>
              </div>
              <Dropdown
                id={teamMember.roleId}
                value={teamMember.roleName}
                options={[ { value: 'admin', label: 'Admin' }, { value: 'member', label: 'Member' }, { value: 'read', label: 'Read' }]}
                onChange={this.handleChangeRole}
                classes="small dark"
              />
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

InnovationTeam.propTypes = {
  teamMembers: PropTypes.array,
  userSetRole: PropTypes.func
}

const actions = { userSetRole };

export default connect(null, actions)(InnovationTeam);
