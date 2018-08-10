import {
  REQUEST_ALL_USERS_BEGIN,
  REQUEST_ALL_USERS_SUCCESS,
  REQUEST_ALL_USERS_ERROR,
  REQUEST_INNOVATION_USERS_BEGIN,
  REQUEST_INNOVATION_USERS_SUCCESS,
  REQUEST_INNOVATION_USERS_ERROR,
  INVITE_INNOVATION_USERS_BEGIN,
  INVITE_INNOVATION_USERS_SUCCESS,
  INVITE_INNOVATION_USERS_ERROR,
  USER_SET_ROLE_BEGIN,
  USER_SET_ROLE_SUCCESS,
  USER_SET_ROLE_ERROR,
  USER_REMOVE_ROLE_BEGIN,
  USER_REMOVE_ROLE_SUCCESS,
  USER_REMOVE_ROLE_ERROR
} from '../config/constants';

// Import JSON API models.
import { User, Role, Partner } from '../models';

import { displayMessage } from './ui';

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: REQUEST_ALL_USERS_BEGIN });
  try {
    const { data } = await User.per(200).all() // TODO: find way to return all results with specified top limit
    const inVentureUsers = data.map(user => ({ ...user.attributes }) )
    dispatch({ type: REQUEST_ALL_USERS_SUCCESS, inVentureUsers });
  }
  catch (err) {
    dispatch({ type: REQUEST_ALL_USERS_ERROR });
    console.log(err);
  }
}

// NB: On the front end the term 'innovation' is used to describe an entire 'project' which includes the partner data.
// NB: On the back end partner owns innovation and also owns the roles and users.
export const getActiveInnovationUsers = (partnerId) => async (dispatch) => {
  dispatch({ type: REQUEST_INNOVATION_USERS_BEGIN });
  try {
    const partner = (await Partner.includes({ roles: 'user' }).find(partnerId)).data

    const activeInnovationUsers = partner.roles.map(role => {
      return {
        roleId: role.id,
        roleName: role.name,
        id: role.user.id,
        name: role.user.name,
        email: role.user.email
      }
    })
    dispatch({ type: REQUEST_INNOVATION_USERS_SUCCESS, activeInnovationUsers });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: REQUEST_INNOVATION_USERS_ERROR });
  }
}

// Emails is an array of email addresses.
export const inviteInnovationUsers = (partnerId, emails, roleName) => async (dispatch) => {
  dispatch({ type: INVITE_INNOVATION_USERS_BEGIN });
  try {
    for ( const email of emails ) {
      const newRole = new Role({ email: email, name: roleName, rolableId: partnerId, rolableType: 'Partner' });
      await newRole.save();
    }
    dispatch({ type: INVITE_INNOVATION_USERS_SUCCESS });
    dispatch(getActiveInnovationUsers(partnerId))
    dispatch(displayMessage('User invite(s) sent'));
  }
  catch (err) {
    console.log(err);
    dispatch({ type: INVITE_INNOVATION_USERS_ERROR });
  }
}

export const userSetRole = (roleId, newRoleName) => async (dispatch, getState) => {
  dispatch({ type: USER_SET_ROLE_BEGIN });

  try {
    const role = (await Role.find(roleId)).data
    role.name = newRoleName;
    await role.save();

    dispatch({ type: USER_SET_ROLE_SUCCESS });

    const { partners: {activePartner: {id} } } = getState();
    dispatch(getActiveInnovationUsers(id));
    dispatch(displayMessage('User access updated'));

  } catch (err) {
    dispatch({ type: USER_SET_ROLE_ERROR });
    console.log(err);
  }
};

export const userRemoveRole = (roleId) => async (dispatch, getState) => {
  dispatch({ type: USER_REMOVE_ROLE_BEGIN });

  try {
    const role = (await Role.find(roleId)).data;
    await role.destroy();
    dispatch({ type: USER_REMOVE_ROLE_SUCCESS });

    const { partners: {activePartner: {id} } } = getState();
    dispatch(getActiveInnovationUsers(id));
    dispatch(displayMessage('Team member removed'));

  } catch (err) {
    dispatch({ type: USER_REMOVE_ROLE_ERROR });
    console.log(err);
  }
};
