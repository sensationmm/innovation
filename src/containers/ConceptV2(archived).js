import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import ConceptHeader from '../components/concept/ConceptHeader';
import ConceptMeta from '../components/concept/ConceptMeta';
import RiskLevel from '../components/RiskLevel';
import Slider from '../components/Slider';

class ConceptV2 extends Component {

  updateConcept = () => {
    console.log('Concept Updated');
  }

  render() {
    const {
      conceptsById,
      match: { params: { conceptId } },
      innovationDates,
      innovationLocation
    } = this.props;

    const concept = conceptsById[conceptId];
    if(!concept) {
      return null
    }

    return (
      <div className='concept'>
        <ConceptHeader
          logo={concept.logo}
          name={concept.name}
          strapline={concept.strapline}
          location={innovationLocation}
          portfolioDates={innovationDates}
          killMark={concept.killedAt}
        />

        <ContentBox background={false} padded>
          <Slider viewable={3} slides={8}>
            <ConceptMeta
              stats={[
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Customer segment' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Friction' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Customer segment' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Friction' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Customer segment' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Customer segment' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Friction' },
                { label: 'Lorem ipsum dorlar elis sium engratio lodisu', content: 'Customer segment' }
              ]}
              stacked
              isStats
            />
          </Slider>
        </ContentBox>

        <FlexRow>
          <ContentBox border padded>
            <ConceptMeta
              label='Focus & Business model'
              stats={[
                { label: 'Primary technology', content: 'Mobile' },
                { label: 'Target industry', content: 'Industrial' },
                { label: 'Target geography', content: 'Builders' },
                { label: 'Business Type & Channel', content: 'Marketplace' },
                { label: 'Revenue Model', content: 'Platform transaction' },
                { label: 'Unit economics', content: 'Hardware' }
              ]}
              stacked
            />
          </ContentBox>

          <ContentBox border padded>
            <ConceptMeta
              label='Corporate advantage'
              summary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus nunc quis quam fringilla pretium. Maecenas pellentesque convallis lobortis. Nullam vel ante porttitor odio eleifend ullamcorper at vitae mi. Sed id tortor dui. Fusce non placerat dui. Aliquam placerat lectus in tincidunt suscipit.'
              stacked
            />
          </ContentBox>
        </FlexRow>

        <FlexRow>
          <ContentBox border padded>
            <ConceptMeta
              label='Cost & Team conviction'
              stats={[
                { label: 'Incubation cost', content: '£17.5m' },
                { label: 'Breakdown cost', content: '£1.2m' },
                { label: 'Would VA leave DV', content: 'YES' }
              ]}
              stacked
              isStats
            />
          </ContentBox>

          <ContentBox border padded>
            <ConceptMeta
              label='Venture finance confidence'
              stats={[
                { label: 'Solution', content: <RiskLevel level={1} /> },
                { label: 'Business model', content: <RiskLevel level={2} /> },
                { label: 'Market size', content: <RiskLevel level={3} /> },
                { label: 'Corporate advantage', content: <RiskLevel level={3} /> },
                { label: 'Team conviction', content: <RiskLevel level={2} /> }
              ]}
              stacked
            />
          </ContentBox>
        </FlexRow>
      </div>
    );
  }
}

ConceptV2.propTypes = {
  conceptsById: PropTypes.object,
  match: PropTypes.object,
  opportunityAreas: PropTypes.array,
  innovationDates: PropTypes.object,
  innovationLocation: PropTypes.string
};

const mapStateToProps = state => ({
  conceptsById: state.concepts.conceptsById,
  opportunityAreas: state.innovations.activeInnovation.opportunityAreas,
  innovationDates: state.innovations.activeInnovation.keyDates,
  innovationLocation: state.innovations.activeInnovation.location
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ConceptV2);
