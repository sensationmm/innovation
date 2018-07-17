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
  UPDATE_INNOVATION_BEGIN,
  UPDATE_INNOVATION_SUCCESS,
  UPDATE_INNOVATION_ERROR,
  // DELETE_INNOVATION_BEGIN,
  // DELETE_INNOVATION_SUCCESS,
  // DELETE_INNOVATION_ERROR
} from '../config/constants';

// Import JSON API models.
import { Innovation, Role, KeyDate } from '../models';

export const getAllInnovationsList = () => async dispatch => {
  dispatch({ type: GET_INNOVATIONS_LIST_BEGIN })
  try {
    const { data } = await Innovation.select([ 'id', 'name', 'logo' ]).all()
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
    const { data } = await Innovation.includes([
      'key_dates', { roles: 'user' }, 'concepts'
    ]).find(ventureId); // TODO: auth action is not calling this at the momemnt so as not to overwrite dummy data in redux store.
    dispatch({ type: GET_INNOVATION_DATA_SUCCESS, data });
    return data;
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATION_DATA_ERROR })
  }
}

export const createInnovation = (innovationData) => async dispatch => {
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  // TODO: Loop through all attributes in the innovationData object, adding them to the innovation.
  try {
    // TODO: 1. Create the new Corporate partner instance
    // TODO: 2. Attach a new innovation to the CP instance, add the new attributes from innovationData then save and retrieve ID.
    // TODO: 3. Create the new member instance (Team GM) and attach to the innovation
    // TODO: 4. Create the new keydate instance (Open Date) and attach to the innovation
    // TODO: 5. save the innovation
    const newInnovation = new Innovation();
    Object.keys(innovationData).forEach(key => {
      newInnovation[key] = innovationData[key]
    })
    // await newInnovation.save();
    // If there are users added then create them and add them to the innovation before saving.
    // innovationData.newTeamMembers[]
    // for (const email of newTeamMembers) { // TODO: Revert back to member of newTeamMembers
    //   // const { name, email } = member; // TODO: You will need to pass a name, and email and an access level.
    //   const role = new Role({ name: 'admin', email, rolableId: newInnovation.id, rolableType: 'Innovation' });
    //   // TODO. Implement access levels setup and final attributes.
    //   await role.save();
    // }
    // for (const innovationKeyDate of innovationKeyDates) {
    //   // const { name, email } = member; // TODO: You will need to pass a name, and email and an access level.
    //   const { name, date } = innovationKeyDate;
    //   const formattedDate = moment(date).format('YYYY-MM-DD');
    //   const keyDate = new KeyDate({ name, date: formattedDate, keyDatableId: newInnovation.id, keyDatableType: 'Innovation' });
    //   await keyDate.save();
    // }

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

export const editInnovation = (innovationId, newInnovationData) => dispatch => {
  dispatch({ type: UPDATE_INNOVATION_BEGIN })
  try {
    console.log('editInnovation action');
    dispatch({ type: UPDATE_INNOVATION_SUCCESS })
  }
  catch (err) {
    console.log(err);
    dispatch({ type: UPDATE_INNOVATION_ERROR })
  }
}
