import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { makeArrayFromIndexedObject, getByKey } from '../utils/functions';
import { ideation, matrixes, archetypes, keyTechs } from '../config/conceptOptions';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import Group from '../components/Group';
import GroupAxes from '../components/GroupAxes';
import Dropdown from '../components/Dropdown';
import TagFilter from '../components/TagFilter';

import '../styles/css/groupings.css';

class Grouping extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: 'matrix',
      filterIdeation: null,
      filterTechnology: null,
      filterArchetype: null,
    };
  }

  changeGrouping = (newGrouping) => {
    this.setState({
      ...this.state,
      group: newGrouping
    });
  }

  filterConcepts = (concepts) => {
    const { filterIdeation, filterTechnology, filterArchetype } = this.state;

    if(concepts) {
      concepts.forEach((concept, count) => {
        if(
          (filterTechnology !== null && filterTechnology !== concept.technology) ||
          (filterArchetype !== null && filterArchetype !== concept.archetype) ||
          (
            filterIdeation !== null && 
            concept.killedAt !== null && 
            moment(concept.killedAt).format('YYYY-MM-DD') <= moment(filterIdeation).format('YYYY-MM-DD')
          )
        ) {
          concept.filteredOut = true;
        } else {
          concept.filteredOut = false;
        }
      });
      return concepts;
    }
  }

  getGrouping = (concepts) => {
    const { group } = this.state;
    const { opportunityAreas } = this.props;

    const groupings = [];
    const groupingLabels = [];

    switch(group) {
      case 'matrix':
        matrixes.forEach(item => {
          const initialConcepts = getByKey(concepts, item.value, 'matrix');
          const filteredConcepts = this.filterConcepts(initialConcepts);
          
          groupings.push(filteredConcepts);
          groupingLabels.push(item.label);
        });
        break;

      case 'opportunity':
        opportunityAreas.forEach(item => {
          const initialConcepts = getByKey(concepts, item.id, 'opportunityArea');
          const filteredConcepts = this.filterConcepts(initialConcepts);

          groupings.push(filteredConcepts);
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

  setFilter = (filter, stateItem) => {
    this.setState({
      [stateItem]: filter
    })
  }

  render() {
    const { group, filterIdeation, filterTechnology, filterArchetype } = this.state;
    const { conceptsById, portfolioDates } = this.props;
    const concepts = makeArrayFromIndexedObject(conceptsById);

    const { groupings, groupingLabels } = this.getGrouping(concepts);
    const numRows = groupings.length / 2;

    const groupingsRows = [];
    for(let i=0; i<numRows; i++) {
      //break into slices for rendering into 2x2 grid markup
      groupingsRows[i] = groupings.slice(i*2, (i*2)+2);
    }

    const ideationDates = ideation.slice(0).map((ideation, count) => {
      const hold = ideation;
      hold.value = portfolioDates[ideation.label];
      return hold;
    });

    const boxes = groupingsRows.map((row, count) => {
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

        <div className="groupings-filters">
          <TagFilter
            label="Ideation"
            stateItem="filterIdeation"
            tags={ideationDates}
            active={filterIdeation}
            onSetFilter={this.setFilter}
          />

          <TagFilter
            label="Key Tech"
            stateItem="filterTechnology"
            tags={keyTechs}
            active={filterTechnology}
            onSetFilter={this.setFilter}
          />

          <TagFilter
            label="Archetypes"
            stateItem="filterArchetype"
            tags={archetypes}
            active={filterArchetype}
            onSetFilter={this.setFilter}
          />
        </div>

        { group === 'matrix'
          ? <GroupAxes labels={[
              ['Current Revenue','New Revenue'],
              ['At Scale Horizontal','Vertical Growth']
            ]}>
              {boxes}
            </GroupAxes>
          : boxes
        }
      </div>
    );
  }
}

Grouping.propTypes = {
  conceptsById: PropTypes.object,
  portfolioDates: PropTypes.object,
  opportunityAreas: PropTypes.array
};

const mapStateToProps = state => ({
  conceptsById: state.concepts.conceptsById,
  opportunityAreas: state.portfolios.activePortfolio.opportunityAreas,
  portfolioDates: state.portfolios.activePortfolio.dates
});

export default connect(mapStateToProps, null)(Grouping);
