import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeArrayFromIndexedObject, getByKey } from '../utils/functions';
import { matrix } from '../config/conceptOptions';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import Group from '../components/concept/Group';
import Dropdown from '../components/Dropdown';

import '../styles/css/groupings.css';

class Grouping extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: 'matrix'
    };
  }

  changeGrouping = (newGrouping) => {
    this.setState({
      ...this.state,
      group: newGrouping
    });
  }

  getGrouping = (concepts) => {
    const { group } = this.state;
    const { opportunityAreas } = this.props;

    const groupings = [];
    const groupingLabels = [];

    switch(group) {
      case 'matrix':
        matrix.forEach(item => {
          groupings.push(getByKey(concepts, item.value, 'matrix'));
          groupingLabels.push(item.label);
        });
        break;

      case 'opportunity':
        opportunityAreas.forEach(item => {
          groupings.push(getByKey(concepts, item.id, 'opportunityArea'));
          groupingLabels.push(item.name);
        });
        break;

      default:
        break;
    }

    if(groupings.length%2 !== 0) {
      groupings.push(null); // maintain 2x2 layout
    }

    return { groupings, groupingLabels };
  }

  render() {
    const { group } = this.state;
    const { conceptsById } = this.props;
    const concepts = makeArrayFromIndexedObject(conceptsById);

    const { groupings, groupingLabels } = this.getGrouping(concepts);
    const numRows = groupings.length / 2;

    const groupingsRows = [];
    for(let i=0; i<numRows; i++) {
      //break into slices for rendering into 2x2 grid markup
      groupingsRows[i] = groupings.slice(i*2, (i*2)+2);
    }

    return (
      <div className="groupings">
        <div className="groupings-select">
          <Dropdown
            id="riskType"
            value={group}
            onChange={(e) => this.changeGrouping(e.target.value)}
            options={
              [
                { value: 'matrix', label: '2x2 Matrix'},
                { value: 'opportunity', label: 'Opportunity Area'}
              ]
            }
          />
        </div>

        { 
          groupingsRows.map((row, count) => {
            return (
              <FlexRow key={`row-${count}`}>
              {
                row.map((group, count2) => {
                  if(!groupingLabels[(count*2) + count2]) {
                    return <div key={`group-${count2}`} className="spacer" />;
                  }

                  return (
                    <ContentBox key={`group-${count2}`}>
                      <Group 
                        items={group}
                        label={groupingLabels[(count*2) + count2]}
                      />
                    </ContentBox>
                  )
                })
              }
              </FlexRow>
            )
          })
        }
      </div>
    );
  }
}

Grouping.propTypes = {
  conceptsById: PropTypes.object,
  opportunityAreas: PropTypes.array
};

const mapStateToProps = state => ({
  conceptsById: state.concepts.conceptsById,
  opportunityAreas: state.portfolios.activePortfolio.opportunityAreas
});

export default connect(mapStateToProps, null)(Grouping);
