import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CalendarItem from './CalendarItem';
import CalendarGrouping from './CalendarGrouping';

import '../styles/css/calendar.css';

class Calendar extends Component {

  constructor() {
    super();

    this.today = moment();

    this.start = moment().subtract(1, 'month');
    this.end = moment().add(3, 'month');
    this.lifespan = this.end.diff(this.start);
  }

  calculateScale = (date) => {
    return (moment(date).diff(this.start) / this.lifespan) * 100; //percentage positioning of each point
  };

  groupInnovations = () => {
    const groupings = [];
    const groupingsLabels = [];

    this.props.innovations.forEach((innovation, count) => {
      let groupingIndex = groupingsLabels.indexOf(innovation.region);

      if(groupingIndex < 0) {
        groupingsLabels.push(innovation.region);
        groupings.push({
          label: innovation.region,
          innovations: []
        });
        groupingIndex = groupingsLabels.length - 1;
      }

      groupings[groupingIndex].innovations.push(innovation);
    });

    return groupings;
  }

  render() {

    const month1 = moment().startOf('month');
    const month2 = moment().startOf('month').add(1, 'month');
    const month3 = moment().startOf('month').add(2, 'month');
    const month4 = moment().startOf('month').add(3, 'month');
    const month5 = moment().startOf('month').add(4, 'month');
    const month6 = moment().startOf('month').add(5, 'month');

    const innovations = (this.props.innovations[0].region) ? this.groupInnovations() : this.props.innovations;

    return (
      <div className="calendar">
        {innovations[0].label 

          ? (
              innovations.map((grouping, index) => {
                return (
                  <CalendarGrouping key={`grouping-${index}`} label={grouping.label}>
                  {
                    grouping.innovations.map((innovation, count) => {
                      return <CalendarItem key={`calendar-item-${count}`} innovation={innovation} calculateScale={this.calculateScale} />
                    })
                  }
                  </CalendarGrouping>
                )
              })
            )
          : innovations.map((innovation, count) => {
            return <CalendarItem key={`calendar-item-${count}`} innovation={innovation} calculateScale={this.calculateScale} />
          })
        }

        <div className="calendar-guides">
          <div className="calendar-dates" 
            style={{ 
              width: `${ this.calculateScale(month6) - this.calculateScale(month1) }%`, 
              left: `${ this.calculateScale(month1) }%` 
            }}
          >
            <div>{ month1.format('MMM YY') }</div>
            <div>{ month2.format('MMM YY') }</div>
            <div>{ month3.format('MMM YY') }</div>
            <div>{ month4.format('MMM YY') }</div>
            <div>{ month5.format('MMM YY') }</div>
          </div>

          <div className="calendar-today" style={{ left: `${ this.calculateScale(this.today) }%` }} />
          <div className="calendar-today-label" style={{ left: `${ this.calculateScale(this.today) }%` }}>Today</div>

          <div className="calendar-guide" style={{ left: `${ this.calculateScale(month1) }%` }} />
          <div className="calendar-guide" style={{ left: `${ this.calculateScale(month2) }%` }} />
          <div className="calendar-guide" style={{ left: `${ this.calculateScale(month3) }%` }} />
          <div className="calendar-guide" style={{ left: `${ this.calculateScale(month4) }%` }} />
          <div className="calendar-guide" style={{ left: `${ this.calculateScale(month5) }%` }} />
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  innovations: PropTypes.array
};

export default Calendar;
