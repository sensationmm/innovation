import React from 'react';
// import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import InnovationSummary from '../components/innovation/InnovationSummary';
import ProgressBar from '../components/ProgressBar';
import ConceptList from '../components/concept/ConceptList';

const Home = (props) => {
  const { activeInnovation, conceptsById } = props;

  const milestonesLabels = Object.keys(activeInnovation.keyDates);
  const milestonesDates = milestonesLabels.map(label => {
    return activeInnovation.keyDates[label];
  });

  return (
    <div>
      <ContentBox>
        <h1>Welcome to VentureView!</h1>
        <p>You will soon be able to track all of your Innovation Concepts here!</p>
      </ContentBox>

      <ContentBox background={false}>
        <ProgressBar dates={milestonesDates} labels={milestonesLabels} />
      </ContentBox>

      <FlexRow>
        <ContentBox>
          <InnovationSummary activeInnovation={activeInnovation} />
        </ContentBox>

        <ContentBox>
          <ConceptList conceptsById={conceptsById} />
        </ContentBox>
      </FlexRow>
    </div>
  );
}

Home.propTypes = {
  activeInnovation: PropTypes.object,
  conceptsById: PropTypes.object
};

const mapStateToProps = state => ({
  activeInnovation: state.innovations.activeInnovation,
  conceptsById: state.concepts.conceptsById
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
