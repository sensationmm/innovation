import {
  CHECK_BREAKPOINT,
  SET_ALERT_MESSAGE,
  DISMISS_ALERT_MESSAGE
} from '../config/constants';

function checkBreakPoint() {
  const app = document.getElementById('app');

  const width = app ? app.offsetWidth : window.innerWidth;
  const height = window.innerHeight;

  let breakpoint;

  switch (true) {
    case (width < 800):
      breakpoint = 'mobile';
      break;

    default:
      breakpoint = 'desktop';
      break;
  }

  return { width, height, breakpoint };
}

const defaultValues = checkBreakPoint();

const defaultState = {
  width: defaultValues.width,
  height: defaultValues.height,
  breakpoint: defaultValues.breakpoint
};

export const ui = (state = defaultState, action) => {
  switch (action.type) {

    // initial app set up
    case 'SET_VIEWPORT':
      return defaultState;

    case CHECK_BREAKPOINT: {

      const newUI = checkBreakPoint();

      return Object.assign({}, state, {
        width: newUI.width,
        height: newUI.height,
        breakpoint: newUI.breakpoint
      });
    }

    case SET_ALERT_MESSAGE: {
      const { message } = action;
      return { ...state, message }
    }

    case DISMISS_ALERT_MESSAGE: {
      return { ...state, message: null }
    }

    default:
      return state;
  }
};
