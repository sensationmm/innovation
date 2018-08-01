import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

import '../styles/css/calendar.css';

class CalendarItem extends Component {

  constructor() {
    super();

    this.state = {
      showDetails: false
    }
  }

  toggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  renderTrack = (splits) => {
    const splitStyle = [];

    splits.forEach((split, count) => {
      if(count > 0 && count < splits.length - 1) {
        splitStyle.push(`rgba(80,227,194, ${count * 0.25}) ${split}%`);
        splitStyle.push(`rgba(80,227,194, ${(count+1) * 0.25}) ${splits[count+1]}%`);
      } else if(count === splits.length - 1) {
        splitStyle.push(`rgba(80,227,194, ${count * 0.25}) ${split}%`);
      } else {
        splitStyle.push(`#656E74 ${split}%`);
        splitStyle.push(`#656E74 ${splits[count + 1]}%`);
      }
    });

    return { 
      left: `${splits[0]}%`,
      width: `${splits[splits.length - 1] - splits[0]}%`,
      backgroundColor: 'ffffff', 
      backgroundImage: `linear-gradient(90deg, ${splitStyle.join(',')})` 
    };
  }

  render() {

    const { innovation, calculateScale } = this.props;
    const { showDetails } = this.state;

    const { 
      partnerId,
      sprintName, 
      partner, 
      chargeCode, 
      dvOffice,
      dvPartner1,
      dvPartner2,
      gm,
      keyDates, 
      openDate 
    } = innovation;

    const splits = [];
    splits.push(calculateScale(openDate));

    return (
      <div className="calendar-item">
        <div className="calendar-item-header">
          <Link to={`/innovation-overview/${partnerId}`}>{sprintName}</Link>
          <div className={classnames('calendar-item-details', { active: showDetails })}>
            <ul>
            {partner && <li>{partner}</li>}
            {chargeCode && <li>C-code: {chargeCode}</li>}
            {dvOffice && <li>Office: {dvOffice}</li>}
            {dvPartner1 && <li>Partners: {dvPartner1} / {dvPartner2}</li>}
            {gm && <li>GM: {gm}</li>}
            {keyDates[0] && <li>KO: {moment(keyDates[0].date).format('DD MMMM YYYY')}</li>}
            {keyDates[1] && <li>IS1: {moment(keyDates[1].date).format('DD MMMM YYYY')}</li>}
            {keyDates[2] && <li>IS2: {moment(keyDates[2].date).format('DD MMMM YYYY')}</li>}
            {keyDates[3] && <li>IS3: {moment(keyDates[3].date).format('DD MMMM YYYY')}</li>}
            </ul>
          </div>
          <div className={classnames('calendar-item-details-trigger', { active: showDetails })} onClick={this.toggleDetails}>
            <i className="fas fa-angle-down"></i>
          </div>
        </div>
        
        <div className="calendar-item-schedule">
          {
            keyDates.map((date, count) => {
              const split = calculateScale(date.date);

              splits.push(split);

              return (
                <div key={`date-${count}`} className="calendar-item-pin" style={{ left: `${ split}%` }}>
                  {date.name}
                </div>
              )
            })
          }
          <div className="calendar-item-track" style={this.renderTrack(splits)} />
        </div>
      </div>
    );
  }
}

CalendarItem.propTypes = {
  innovation: PropTypes.object,
  calculateScale: PropTypes.func
};

export default CalendarItem;
