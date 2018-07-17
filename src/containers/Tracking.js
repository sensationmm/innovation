import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { makeArrayFromIndexedObject } from '../utils/functions';

import ContentBox from '../components/layout/ContentBox';
import ProgressBar from '../components/ProgressBar';
import ConceptAvatar from '../components/concept/ConceptAvatar';

import Active from '../components/tracking/Active';
import Killed from '../components/tracking/Killed';
import Pivoted from '../components/tracking/Pivoted';
import Merged from '../components/tracking/Merged';
import Split from '../components/tracking/Split';

import '../styles/css/tracking.css';

class Tracking extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  calculatePos = (date = null) => {
    const { innovationDates } = this.props;

    const dates = makeArrayFromIndexedObject(innovationDates);
    dates.sort();

    if(date === null) {
      date = dates[dates.length - 1];
    }

    const start = moment(dates[0]);
    const end = moment(dates[dates.length - 1]);
    const lifespan = end.diff(start);
    console.log(document.getElementById('svg-grid'))
    const svgWidth = document.getElementById('svg-grid') ? document.getElementById('svg-grid').clientWidth : 800;

    console.log(svgWidth, lifespan);

    return (moment(date).diff(start) / lifespan) * svgWidth;
  };

  calculateRowPos = (row) => {
    return row* 50 + 26;
  }

  render() {
    const { conceptsById, innovationDates } = this.props;

    const concepts = makeArrayFromIndexedObject(conceptsById);

    const milestonesLabels = Object.keys(innovationDates);
    console.log('milestonesLabels', milestonesLabels);
    const milestonesDates = milestonesLabels.map(label => {
      return innovationDates[label];
    });
    console.log('milestonesDates', milestonesDates);

    const avatars = [];

    return (
      <div className="tracking">
        <ContentBox background={false}>
          <ProgressBar dates={milestonesDates} labels={milestonesLabels} />
        </ContentBox>

        <ContentBox>
          <svg id="svg-grid">
          {
            concepts.map((concept, count) => {
              const {
                id,
                logo,
                ident,
                color,
                createdAt,
                killedAt,
                pivotedAt,
                mergedAt,
                splitAt
              } = concept;

              avatars.push(
                <div key={`row-${count}`} className="tracking-row" style={{ left: `${this.calculatePos(createdAt)}px` }}>
                  <ConceptAvatar conceptId={id} ident={ident} color={color} logo={logo} showLink={false} />
                </div>
              );

              const active = !splitAt && !mergedAt && !pivotedAt && !killedAt;

              return (
                <g key={`group-${count}`}>
                {splitAt && 
                  <Split 
                    start={this.calculatePos(createdAt)} 
                    end={this.calculatePos(splitAt)} 
                    row={this.calculateRowPos(count)} 
                    rowSplitA={this.calculateRowPos(count-1)} 
                    rowSplitB={this.calculateRowPos(count+1)} 
                  />
                }

                {mergedAt &&
                  <Merged 
                    start={this.calculatePos(createdAt)} 
                    end={this.calculatePos(mergedAt)} 
                    row={this.calculateRowPos(count)} 
                    rowMerge={this.calculateRowPos(count+1)} 
                  />
                }

                {pivotedAt &&
                  <Pivoted 
                    start={this.calculatePos(createdAt)} 
                    end={this.calculatePos(pivotedAt)} 
                    row={this.calculateRowPos(count)} 
                    rowPivot={this.calculateRowPos(count-1)} 
                  />
                }

                {killedAt &&
                  <Killed 
                    start={this.calculatePos(createdAt)} 
                    end={this.calculatePos(killedAt)} 
                    row={this.calculateRowPos(count)} 
                  />
                }

                {active &&
                  <Active 
                    start={this.calculatePos(createdAt)} 
                    end={this.calculatePos()} 
                    row={this.calculateRowPos(count)} 
                  />
                }
                </g>
              )
            })
          }
          </svg>

          {avatars}
        </ContentBox>
      </div>
    );
  }
}

Tracking.propTypes = {
  conceptsById: PropTypes.object,
  innovationDates: PropTypes.object
};

const mapStateToProps = state => ({
  conceptsById: state.concepts.conceptsById,
  innovationDates: state.innovations.activeInnovation.keyDates
});

export default connect(mapStateToProps, null)(Tracking);
