import {
  GET_RESOURCE_DATA_BEGIN,
  GET_RESOURCE_DATA_SUCCESS,
  GET_RESOURCE_DATA_ERROR
} from '../config/constants';

import { Industry, DvOffice, TargetIndustry } from '../models';

export const getAppResourceData = () => async dispatch => {
  dispatch({ type: GET_RESOURCE_DATA_BEGIN })
  try {
    const industries = (await Industry.all()).data.map(industry => {
      return { ...industry.attributes }
    });
    const dvOffices = (await DvOffice.all()).data.map(dvOffice => {
      return { ...dvOffice.attributes }
    });
    const targetIndustries = (await TargetIndustry.all()).data.map(targetIndustry => {
      return { ...targetIndustry.attributes }
    });
    dispatch({ type: GET_RESOURCE_DATA_SUCCESS, industries, dvOffices, targetIndustries })
  }
  catch (err) {
    dispatch({ type: GET_RESOURCE_DATA_ERROR })
  }
}
