import {
  CREATE_CONCEPT_BEGIN,
  CREATE_CONCEPT_SUCCESS,
  CREATE_CONCEPT_ERROR,
  EDIT_CONCEPT_BEGIN,
  EDIT_CONCEPT_SUCCESS,
  EDIT_CONCEPT_ERROR,
  DELETE_CONCEPT_BEGIN,
  DELETE_CONCEPT_SUCCESS,
  DELETE_CONCEPT_ERROR,
  ADD_CONCEPT_CANVAS_BEGIN,
  ADD_CONCEPT_CANVAS_SUCCESS,
  ADD_CONCEPT_CANVAS_ERROR
} from '../config/constants';

import { Concept, Attachment } from '../models';
import { push } from 'connected-react-router';

import { displayMessage } from './ui';
import  { getDataUri } from '../utils/functions';

/**
 * @param {string|int} innovationId - id of the innovation which the concept will belong to
 * @param {object} attrsToCreate - object of key / value pairs to create the new concept with
 * @param {string} redirectTo - where to redirect to once the save is complete
 */
export const createConcept = (innovationId, attrsToCreate, redirectTo) => async (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN });

  try {
    const newConcept = new Concept();
    for ( const key of Object.keys(attrsToCreate) ) {
      newConcept[key] = attrsToCreate[key];
    }
    newConcept.innovationId = innovationId;
    await newConcept.save();

    //upload canvases
    if(attrsToCreate.canvases) {
      dispatch(addCanvas(newConcept.attributes.id, attrsToCreate.canvasObjects));
    }

    dispatch({ type: CREATE_CONCEPT_SUCCESS, newConcept: { ...newConcept.attributes } });
    dispatch(push(redirectTo));
    dispatch(displayMessage('New Concept created'));
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_CONCEPT_ERROR });
  }
}

/**
 * @param {int} conceptId - id of the concept to be updated
 * @param {object} newConceptAttrs - object of key / value pairs to add / overwrite on to the concept
 * @param {bool} saveToDB - if true then write to DB via API, otherwise write to redux store only.
 */
export const editConcept = (conceptId, newConceptAttrs, saveToDB) => async (dispatch) => {
  dispatch({ type: EDIT_CONCEPT_BEGIN });
  if (saveToDB) {
    try {
      const conceptToUpdate = (await Concept.find(conceptId)).data;
      for ( const key of Object.keys(newConceptAttrs) ) {
        conceptToUpdate[key] = newConceptAttrs[key];
      }
      await conceptToUpdate.save();
      dispatch({ type: EDIT_CONCEPT_SUCCESS, conceptId, newConceptAttrs: { ...conceptToUpdate.attributes } });
      dispatch(displayMessage('Concept updated'));
    }
    catch (err) {
      console.log(err);
      dispatch({ type: EDIT_CONCEPT_ERROR });
    }
  } else {
    dispatch({ type: EDIT_CONCEPT_SUCCESS, conceptId, newConceptAttrs });
  }
}

/**
 * @param {int} conceptId - id of the concept to be deleted
 * @param {string} redirectTo - where to go once the concept is deleted
 */
 export const deleteConcept = (conceptId, redirectTo) => async dispatch => {
   dispatch({ type: DELETE_CONCEPT_BEGIN });
   try {
     const conceptToDelete = (await Concept.find(conceptId)).data;
     await conceptToDelete.destroy()
     // TODO: It may be better to just call the API again here for a fresh list of concepts.
     // Using something like Concept.where(innovationId).all()
     dispatch({ type: DELETE_CONCEPT_SUCCESS, conceptId });
     dispatch(push(redirectTo))
     dispatch(displayMessage('Concept deleted'));
   }
   catch (err) {
     dispatch({ type: DELETE_CONCEPT_ERROR });
   }
 }

 export const addCanvas = (conceptId, attachments) => async dispatch => {

  dispatch({ type: ADD_CONCEPT_CANVAS_BEGIN });

  try {
    const addPreviews = [];
    for ( const attachment of attachments ) {

      const newCanvas = new Attachment();

      const preview = attachment.preview;

      await getDataUri(preview, async function(dataUri) {
        newCanvas.data = dataUri;
        newCanvas.filename = preview;
        newCanvas.name = 'canvases';
        newCanvas.recordId = conceptId;
        newCanvas.recordType = 'Concept';


        addPreviews.push(preview);

        await newCanvas.save();
        dispatch({ type: ADD_CONCEPT_CANVAS_SUCCESS, addPreviews, conceptId });
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: ADD_CONCEPT_CANVAS_ERROR });
  }
 }
