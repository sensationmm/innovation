import {
  CREATE_INNOVATION_BEGIN,
  CREATE_INNOVATION_SUCCESS,
  CREATE_INNOVATION_ERROR,
  GET_INNOVATION_DATA_BEGIN,
  GET_INNOVATION_DATA_SUCCESS,
  GET_INNOVATION_DATA_ERROR,
  GET_INNOVATIONS_LIST_BEGIN,
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATIONS_LIST_ERROR,
  // UPDATE_INNOVATION_BEGIN,
  // UPDATE_INNOVATION_SUCCESS,
  // UPDATE_INNOVATION_ERROR,
  // DELETE_INNOVATION_BEGIN,
  // DELETE_INNOVATION_SUCCESS,
  // DELETE_INNOVATION_ERROR
} from '../config/constants';

// Import JSON API models.
import { Innovation, Role, KeyDate } from '../models';

import moment from 'moment';

export const getAllInnovationsList = () => async dispatch => {
  dispatch({ type: GET_INNOVATIONS_LIST_BEGIN })
  try {
    let { data } = await Innovation.select([ 'id', 'name', 'logo' ]).all()
    dispatch({ type: GET_INNOVATIONS_LIST_SUCCESS, data });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATIONS_LIST_ERROR });
  }
}

export const getActiveInnovationData = ventureId => async dispatch => {
  dispatch({ type: GET_INNOVATION_DATA_BEGIN })
  try {
    let { data } = await Innovation.includes([
      "key_dates", { roles: "user" }, "concepts"
    ]).find(29); // TODO: Remove hardcoded value.
    dispatch({ type: GET_INNOVATION_DATA_SUCCESS, data });
    return data;
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATION_DATA_ERROR })
  }
}

export const createInnovation = (innovationData) => async (dispatch) => {
  const { innovationName, logo, logoDataUri, newTeamMembers, innovationKeyDates } = innovationData;
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  try {
    let newInnovation = new Innovation({
      name: innovationName,
      logo: logoDataUri,
      logoName: logo.name
    })
    await newInnovation.save();
    // If there are users added then create them and add them to the innovation before saving.
    // innovationData.newTeamMembers[]
    for (let email of newTeamMembers) { // TODO: Revert back to member of newTeamMembers
      // const { name, email } = member; // TODO: You will need to pass a name, and email and an access level.
      let role = new Role({ name: 'admin', email, rolableId: newInnovation.id, rolableType: 'Innovation' });
      // TODO. Implement access levels setup and final attributes.
      await role.save();
    }
    for (let innovationKeyDate of innovationKeyDates) {
      // const { name, email } = member; // TODO: You will need to pass a name, and email and an access level.
      const { name, date } = innovationKeyDate;
      const formattedDate = moment(date).format('YYYY-MM-DD');
      let keyDate = new KeyDate({ name, date: formattedDate, keyDatableId: newInnovation.id, keyDatableType: 'Innovation' });
      await keyDate.save();
    }

    dispatch({ type: CREATE_INNOVATION_SUCCESS });

    // TODO: What should happen after you create an innovation. how does this process work in real life?
    // Does one innovation lead just create all the innovations, add the team, key dates etc.
    // When you add an innovation do you want to be then taken to an innovation landing screen where you can add concepts.
    // dispatch(getInnovationList()); Or just add the new innovation directly to redux state to save the extra API call.
    // dispatch(getActiveInnovationData(newInnovation.id)); -- the new innovation will be empty so is there any need to do this?
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_INNOVATION_ERROR })
  }
}
