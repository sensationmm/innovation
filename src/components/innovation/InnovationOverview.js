import React from 'react';
// import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';

import ContentBox from '../layout/ContentBox';
import FlexRow from '../layout/FlexRow';
import InnovationSummary from './InnovationSummary';
import CorporatePartnerSummary from './CorporatePartnerSummary';
import InnovationTeam from './InnovationTeam';
import ProgressBar from '../ProgressBar';
import ConceptList from '../concept/ConceptList';

import '../../styles/css/innovation-overview.css';

import { makeArrayFromIndexedObject } from '../../utils/functions';

const InnovationOverview = (props) => {
  const { activeInnovation, conceptsById } = props;
  const activeConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status !== 'killed');
  const killedConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status === 'killed');

  const isPostIS2 = moment().isAfter(moment(activeInnovation.keyDates.IS2));

  const milestonesLabels = Object.keys(activeInnovation.keyDates);
  const milestonesDates = milestonesLabels.map(label => {
    return activeInnovation.keyDates[label];
  });

  return (
    <div>
      <ContentBox>
        <h1>Innovation Name</h1>
        <div>Innovation Type</div>
        <div>Innovation Mandate</div>
        <div>Sprint Duration</div>
      </ContentBox>

      <ContentBox background={false}>
        <ProgressBar dates={milestonesDates} labels={milestonesLabels} />
      </ContentBox>

      <div className="innovation-overview-toplinks">
        <Link className="innovation-overview-add-concept-link" to="/update-innovation">
          <div>
            <i className="fas fa-plus fa-2x add-concept-icon"></i>
          </div>
          <div>Edit Key Dates and Team</div>
        </Link>
        <Link className="innovation-overview-add-concept-link" to="/create-concept">
          <div>
            <i className="fas fa-plus fa-2x add-concept-icon"></i>
          </div>
          <div>Add Concept</div>
        </Link>
      </div>

      <ContentBox background={false}>
        <ConceptList concepts={activeConcepts} title='Active Concepts' postIS2={isPostIS2} />
      </ContentBox>

      <ContentBox background={false}>
        <ConceptList concepts={killedConcepts} title='Killed Concepts' postIS2={isPostIS2} />
      </ContentBox>

      <FlexRow>
        <ContentBox>
          <h3>Team Info</h3>
          <InnovationTeam
            teamMembers={[
              { name: 'Wayne', position: 'GM' },
              { name: 'Claire', position: 'SD' },
              { name: 'Ainsley', position: 'VA' },
              { name: 'Bo Derek', position: 'TM' }
            ]}
          />
        </ContentBox>
        <ContentBox>
          <CorporatePartnerSummary
            name="BigShots"
            industry="Money"
            city="London"
            businessDescription="Make money"
          />
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
