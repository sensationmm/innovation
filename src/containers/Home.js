import React from 'react';
// import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import ProgressBar from '../components/ProgressBar';
import ConceptList from '../components/concept/ConceptList';

const Home = (props) => {
  const { activePortfolio, conceptsById } = props;

  const milestonesLabels = Object.keys(activePortfolio.dates);
  const milestonesDates = milestonesLabels.map(label => {
    return activePortfolio.dates[label];
  });

  return (
    <div>
      <ContentBox>
        <h1>Welcome to VentureView!</h1>
        <p>You will soon be able to track all of your Portfolio Concepts here!</p>
      </ContentBox>

      <ContentBox background={false}>
        <ProgressBar dates={milestonesDates} labels={milestonesLabels} />
      </ContentBox>

      <FlexRow>
        <ContentBox>
          <PortfolioSummary activePortfolio={activePortfolio} />
        </ContentBox>

        <ContentBox>
          <ConceptList conceptsById={conceptsById} />
        </ContentBox>
      </FlexRow>
    </div>
  );
}

Home.propTypes = {
  activePortfolio: PropTypes.object,
  conceptsById: PropTypes.object
};

const mapStateToProps = state => ({
  activePortfolio: state.portfolios.activePortfolio,
  conceptsById: state.concepts.conceptsById
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
