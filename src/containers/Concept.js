import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeArrayFromIndexedObject, getByKey } from '../utils/functions';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import ConceptLogo from '../components/concept/ConceptLogo';
import ConceptSummary from '../components/concept/ConceptSummary';
import ConceptTags from '../components/concept/ConceptTags';
import ConceptProgress from '../components/concept/ConceptProgress';

class Concept extends Component {

  render() {
    const { 
      conceptsById, 
      opportunityAreas,
      match: { params: { conceptId } } 
    } = this.props;

    const concept = getByKey(makeArrayFromIndexedObject(conceptsById), parseInt(conceptId, 10));

    if(!concept) {
      return null
    }

    const conceptDetails = concept[0];

    return (
      <div className="concept">
        <FlexRow layout={['20%', '80%']}>
          {conceptDetails.logo &&
            <ContentBox>
              <ConceptLogo logo={conceptDetails.logo} name={conceptDetails.name} />
            </ContentBox>
          }

          <ContentBox>
            <ConceptSummary 
              name={conceptDetails.name} 
              strapline={conceptDetails.strapline} 
              description={conceptDetails.description} 
            />
          </ContentBox>
        </FlexRow>

        <ContentBox>
          <ConceptTags 
            matrix={conceptDetails.matrix}
            opportunityArea={conceptDetails.opportunityArea}
            opportunityAreas={opportunityAreas.map(area => { return { value: area.id, label: area.name } })}
            technology={conceptDetails.technology}
            archetype={conceptDetails.archetype}
          />
        </ContentBox>

        <ContentBox>
          <ConceptProgress />
        </ContentBox>
      </div>
    );
  }
}

Concept.propTypes = {
  conceptsById: PropTypes.object,
  match: PropTypes.object,
  opportunityAreas: PropTypes.array
};

const mapStateToProps = state => ({
  conceptsById: state.concepts.conceptsById,
  opportunityAreas: state.portfolios.activePortfolio.opportunityAreas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Concept);
