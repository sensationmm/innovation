import {
  CREATE_INNOVATION_BEGIN,
  CREATE_INNOVATION_SUCCESS,
  CREATE_INNOVATION_ERROR,
  GET_INNOVATION_DATA_BEGIN,
  GET_INNOVATION_DATA_SUCCESS,
  GET_INNOVATION_DATA_ERROR,
  // GET_INNOVATIONS_BEGIN,
  // GET_INNOVATIONS_SUCCESS,
  // GET_INNOVATIONS_ERROR,
  // UPDATE_INNOVATION_BEGIN,
  // UPDATE_INNOVATION_SUCCESS,
  // UPDATE_INNOVATION_ERROR,
  // DELETE_INNOVATION_BEGIN,
  // DELETE_INNOVATION_SUCCESS,
  // DELETE_INNOVATION_ERROR
} from '../config/constants';

// Import JSON API models.
import { Innovation, Role } from '../models';

export const getActiveInnovationData = (ventureId) => async (dispatch) => {
  dispatch({ type: GET_INNOVATION_DATA_BEGIN })
  console.log('getActiveInnovationData');
  try {
    let { data } = await Innovation.find(2);
    console.log('data from DB', data);
    dispatch({ type: GET_INNOVATION_DATA_SUCCESS })
    return data;
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATION_DATA_ERROR })
  }
}

export const createInnovation = (innovationData) => async (dispatch) => {
  const { innovationName, logo, newTeamMembers, innovationKeyDates } = innovationData;
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  console.log('Creating an innovation with: ', innovationData);
  try {
    let newInnovation = new Innovation({
      name: innovationName,
      // logo: logo && logo.preview ? logo.preview : null // TODO. The logo file may need formatting before being sent to the API.
    })

    await newInnovation.save();

    // If there are users added then create them and add them to the innovation before saving.
    // innovationData.newTeamMembers[]
    for (let email of newTeamMembers) {
      let role = new Role({ name: email }); // TODO. Implement access levels setup and correct attributes.
      await role.save();
      // TODO: Once the role is saved you should add it to the Innovation
    }
    dispatch({ type: CREATE_INNOVATION_SUCCESS })

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
