import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import '../styles/css/progress-bar.css';

/**
 * ProgressBar
 *
 * Renders a date-based progress bar with specified milestones
 *
 * @param {array} dates - an array of dates to render as milestones
 * @param {array} labels - an array of labels to render against the dates above
 */

const ProgressBar = props => {
  const {
    dates,
    labels,
    killMark
  } = props;

  const start = moment(dates[0]);
  const end = moment(dates[dates.length - 1]);
  const lifespan = end.diff(start);

  const calculateScale = (date) => {
    return (moment(date).diff(start) / lifespan) * 100; //percentage positioning of each point
  };

  // const isPast = (date) => {
  //   return moment(date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD');
  // };

  const ticks = dates.map(date => {
    return calculateScale(date)
  });

  const todayScale = calculateScale(moment().format('YYYY-MM-DD'));
  const killedAtScale = (killMark) ? calculateScale(moment(killMark).format('YYYY-MM-DD')) : null;

  return (
    <div className="progress-bar">

      <div className="progress-bar-bar">
        {killMark &&
          <div className="progress-bar-pip killmark" style={{ left: `${killedAtScale}%` }}>
            <i className="fas fa-times" />
          <div className="progress-bar-pip-popup">Concept killed<br />{ moment(killMark).format('DD-MM-YY') }</div>
          </div>
        }
        <div className={classnames('progress-bar-pip', {killed: killMark})} style={{ left: `${todayScale}%` }}>
          <div className="progress-bar-pip-popup">Today<br />{ moment().format('DD-MM-YY') }</div>
        </div>
        <div className="progress-bar-progress" style={{ width: `${(killMark) ? killedAtScale : todayScale}%` }} />
        <div className="progress-bar-track" />
      </div>

      <div className="progress-bar-labels">
      {
        labels.map((label, count) => {
          return (
            <div 
              key={`label-${count}`} 
              className="progress-bar-label"
              style={{ left: `${ticks[count]}%` }}
            >{label !== 'KO' ? label : 'Ideation'}</div>
          )
        })
      }
      </div>

      <div className="progress-bar-dates">
      {
        dates.map((date, count) => {
          return (
            <div 
              key={`date-${count}`} 
              className="progress-bar-date"
              style={{ left: `${ticks[count]}%` }}
            >{moment(date).format('DD-MM-YY')}</div>
          )
        })
      }
      </div>
    </div> 
  );
};

ProgressBar.propTypes = {
  dates: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  killMark: PropTypes.string
};

export default ProgressBar;
