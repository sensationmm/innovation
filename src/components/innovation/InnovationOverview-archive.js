import React from 'react';
// import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentBox from '../layout/ContentBox';
import FlexRow from '../layout/FlexRow';
import InnovationSummary from './InnovationSummary';
import ProgressBar from '../ProgressBar';
import ConceptList from '../concept/ConceptList';

const InnovationOverview = (props) => {
  const { activeInnovation, conceptsById } = props;

  const milestonesLabels = Object.keys(activeInnovation.keyDates);
  const milestonesDates = milestonesLabels.map(label => {
    return activeInnovation.keyDates[label];
  });

  return (
    <div>
      <ContentBox>
        <h1>Innovation Name</h1>
        <p>Innovation Overview</p>
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

InnovationOverview.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InnovationOverview);
