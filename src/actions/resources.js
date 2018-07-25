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
      console.log('industry', industry);
      return { ...industry.attributes }
    });
    console.log('industries', industries);
    const dvOffices = (await DvOffice.all()).data.map(dvOffice => {
      return { ...dvOffice.attributes }
    });
    console.log('dvOffices', dvOffices);
    // const targetIndustries = (await TargetIndustry.all()).data.map(targetIndustry => {
    //   return { ...targetIndustry.attributes }
    // });
    // console.log('trgetIndustries', targetIndustries);
    dispatch({ type: GET_RESOURCE_DATA_SUCCESS, industries, dvOffices })
  }
  catch (err) {
    dispatch({ type: GET_RESOURCE_DATA_ERROR })
  }
}
