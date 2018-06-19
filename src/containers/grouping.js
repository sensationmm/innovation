import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeArrayFromIndexedObject, getByKey } from '../utils/functions';
import { matrix } from '../config/conceptOptions';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import Group from '../components/concept/Group';

import '../styles/css/groupings.css';

class Grouping extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: 'matrix'
    };
  }

  getGrouping = (concepts) => {
    const { group } = this.state;

    const groupings = [];
    const groupingLabels = [];

    switch(group) {
      case 'matrix':
        matrix.forEach(item => {
          groupings.push(getByKey(concepts, item.value, 'matrix'));
          groupingLabels.push(item.label);
        });

        break;

      default:
        break;
    }

    if(groupings.length%2 !== 0) {
      groupings.push(null);
    }

    return { groupings, groupingLabels };
  }

  render() {
    const { conceptsById } = this.props;
    const concepts = makeArrayFromIndexedObject(conceptsById);

    const { groupings, groupingLabels } = this.getGrouping(concepts);
    const numRows = groupings.length / 2;

    const groupingsRows = [];
    for(let i=0; i<numRows; i++) { //break into slices for rendering in grid
      groupingsRows[i] = groupings.slice(i*2, (i*2)+2);
    }
    
    return (
      <div className="groupings">
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
  conceptsById: PropTypes.object
};

const mapStateToProps = state => ({
  conceptsById: state.concepts.conceptsById
});

export default connect(mapStateToProps, null)(Grouping);
