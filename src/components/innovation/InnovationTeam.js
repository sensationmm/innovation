import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from '../formInputs/Dropdown';
import DeleteIconConfirm from '../buttons/DeleteIconConfirm';

import '../../styles/css/innovation-team.css';

import { userSetRole, userRemoveRole } from '../../actions/users';

import { userTypes } from '../../config/innovationOptions';

class InnovationTeam extends Component {

  handleChangeRole = (e) => {
    const { userSetRole } = this.props;
    userSetRole(e.target.id, e.target.value);
  }

  render() {
    const { teamMembers, readOnly, authedUserEmail, minimal, userRemoveRole } = this.props;
    return (
      <div>
        {
          minimal
            ? (
              <div className="innovation-team-member-display-container">
                {
                  teamMembers && teamMembers.map((teamMember, index) => (
                    <div key={`${index}-${teamMember.name}`} className="innovation-team-member-display-member">
                      {
                        teamMember.name
                          ? <div className="innovation-team-display-name">
                            <span>{teamMember.name}</span>
                            {teamMember.roleName === 'admin' && <span> (Lead)</span>}

                          </div>
                          : (
                            <div>
                              <div className="innovation-team-member-display-email">{teamMember.email}</div>
                              <div className="innovation-team-user-pending-modal">Pending</div>
                            </div>
                          )
                      }
                      {
                        (!readOnly && authedUserEmail !== teamMember.email) &&
                          <DeleteIconConfirm
                            onConfirm={() => userRemoveRole(teamMember.roleId)}
                            iconClass="innovation-team-member-display-delete"
                            confirmText="Remove"
                          />
                      }
                    </div>
                  ))
                }
              </div>
            )
            : (
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
                      <div className="innovation-team-member-display-email">{teamMember.email}</div>
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
            )
        }
      </div>
    )
  }
}

InnovationTeam.propTypes = {
  teamMembers: PropTypes.array,
  userSetRole: PropTypes.func,
  userRemoveRole: PropTypes.func,
  readOnly: PropTypes.bool,
  authedUserEmail: PropTypes.string,
  minimal: PropTypes.bool
}

const mapStateToProps = (state, props) => ({
  readOnly: state.auth.authedUser.roleName !== 'admin',
  authedUserEmail: state.auth.authedUser.email
});

const actions = { userSetRole, userRemoveRole };

export default connect(mapStateToProps, actions)(InnovationTeam);
