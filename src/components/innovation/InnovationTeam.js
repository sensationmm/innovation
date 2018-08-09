import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from '../formInputs/Dropdown';

import '../../styles/css/innovation-team.css';

import { userSetRole } from '../../actions/users';

import { userTypes } from '../../config/innovationOptions';

class InnovationTeam extends Component {

  handleChangeRole = (e) => {
    const { userSetRole } = this.props;
    userSetRole(e.target.id, e.target.value);
  }

  render() {
    const { teamMembers, readOnly, authedUserEmail } = this.props;
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
              {
                (!readOnly && authedUserEmail !== teamMember.email)
                  ? (
                    <Dropdown
                      id={teamMember.roleId}
                      value={teamMember.roleName}
                      options={userTypes}
                      onChange={this.handleChangeRole}
                      classes="small dark"
                    />
                  )
                  : <div className="innovation-team-read-only">{userTypes.find(userType => userType.value === teamMember.roleName).label}</div>
              }
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
  userSetRole: PropTypes.func,
  readOnly: PropTypes.bool,
  authedUserEmail: PropTypes.string
}

const mapStateToProps = (state, props) => ({
  readOnly: state.auth.authedUser.roleName !== 'admin',
  authedUserEmail: state.auth.authedUser.email
});

const actions = { userSetRole };

export default connect(mapStateToProps, actions)(InnovationTeam);
