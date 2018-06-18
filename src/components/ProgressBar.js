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
    labels
  } = props;

  const start = moment(dates[0]);
  const end = moment(dates[dates.length - 1]);
  const lifespan = end.diff(start);

  const calculateScale = (date) => {
    return (moment(date).diff(start) / lifespan) * 100; //percentage positioning of each point
  };

  const isPast = (date) => {
    return moment(date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD');
  };

  const ticks = dates.map(date => {
    return calculateScale(date)
  });

  const todayScale = calculateScale(moment().format('YYYY-MM-DD'));

  return (
    <div className="progress-bar">
      <div className="progress-bar-labels">
      {
        labels.map((label, count) => {
          return (
            <div 
              key={`label-${count}`} 
              className={classnames("progress-bar-label", {past: isPast(dates[count])})}
              style={{ left: `${ticks[count]}%` }}
            >{label}</div>
          )
        })
      }
      </div>

      <div className="progress-bar-bar">
        <div className="progress-bar-pip" style={{ left: `${todayScale}%` }} />
        <div className="progress-bar-progress" style={{ width: `${todayScale}%` }} />
        <div className="progress-bar-track" />
      </div>

      <div className="progress-bar-dates">
      {
        dates.map((date, count) => {
          return (
            <div 
              key={`date-${count}`} 
              className={classnames("progress-bar-date", {past: isPast(date)})}
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
};

export default ProgressBar;
