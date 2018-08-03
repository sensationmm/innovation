import {
  CHECK_BREAKPOINT,
  SET_ALERT_MESSAGE,
  DISMISS_ALERT_MESSAGE
} from '../config/constants';

export const checkBreakPoint = (height, width) => {
    return {
        height,
        width,
        type: CHECK_BREAKPOINT
    };
};

export const displayMessage = (message) => dispatch => {
  dispatch({ type: SET_ALERT_MESSAGE, message });

  setTimeout(() => {
    dispatch(dismissMessage())
  }, 3000);
}

export const dismissMessage = () => dispatch => {
  dispatch({ type: DISMISS_ALERT_MESSAGE });
}
