import {
  REQUEST_ALL_USERS_BEGIN,
  REQUEST_ALL_USERS_SUCCESS,
  REQUEST_ALL_USERS_ERROR,
    // REQUEST_INNOVATION_USERS_BEGIN,
    // REQUEST_INNOVATION_USERS_SUCCESS,
    // REQUEST_INNOVATION_USERS_ERROR,
  INVITE_INNOVATION_USERS_BEGIN,
  INVITE_INNOVATION_USERS_SUCCESS,
  INVITE_INNOVATION_USERS_ERROR
} from '../config/constants';

// Import JSON API models.
import { User, Partner, Role } from '../models';

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: REQUEST_ALL_USERS_BEGIN });
  try {
    const { data } = await User.per(200).all() // TODO: find way to return all results with specified top limit
    const inVentureUsers = data.map(user => ({ ...user.attributes }) )
    const innUsers = (await await Partner.includes({ roles: 'user' }).find(22)).data;
    console.log('innUsers', innUsers);
    dispatch({ type: REQUEST_ALL_USERS_SUCCESS, inVentureUsers });
  }
  catch (err) {
    dispatch({ type: REQUEST_ALL_USERS_ERROR });
    console.log(err);
  }
}

// Emails is an array of email addresses.
export const inviteInnovationUsers = (partnerId, emails, roleName) => async (dispatch) => {
  dispatch({ type: INVITE_INNOVATION_USERS_BEGIN })
  try {
    for ( const email of emails ) {
      console.log('email', email);
      const newUser = new Role({ email, name: 'admin', rolableId: 21, rolableType: 'Partner' });
      console.log('saving new user', newUser);
      await newUser.save();
    }
    dispatch({ type: INVITE_INNOVATION_USERS_SUCCESS });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: INVITE_INNOVATION_USERS_ERROR });
  }
}
