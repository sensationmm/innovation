import React from 'react';
// import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';

import ContentBox from '../layout/ContentBox';
import FlexRow from '../layout/FlexRow';
import CorporatePartnerSummary from './CorporatePartnerSummary';
import InnovationTeam from './InnovationTeam';
import ProgressBar from '../ProgressBar';
import ConceptList from '../concept/ConceptList';

import '../../styles/css/innovation-overview.css';

import { makeArrayFromIndexedObject } from '../../utils/functions';

const userType = 'finance'; // TODO: get this conditionally from  redux store auth.user
const requiredKeyDates = [ 'KO', 'IS1', 'IS2', 'IS3' ]; // TODO: move to congfig

const InnovationOverview = (props) => {
  const { activeInnovation, conceptsById } = props;
  const activeConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status !== 'killed');
  const activeIncomplete = activeConcepts.filter(concept => concept.status === 'draft');
  const activeComplete = activeConcepts.filter(concept => concept.status === 'ready');
  const activeReviewed = activeConcepts.filter(concept => concept.status === 'analysed');
  const killedConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status === 'killed');

  const isPostIS2 = activeInnovation.keyDates && moment().isAfter(moment(activeInnovation.keyDates.IS2));
  const keyDatesSetup = activeInnovation.keyDates && requiredKeyDates.every(reqDate => activeInnovation.keyDates.hasOwnProperty(reqDate));
  return (
    <div>
      <ContentBox>
        <h1>Innovation Name</h1>
        <div>Innovation Type</div>
        <div>Sprint Duration</div>
        {
          activeInnovation.mandate
            ? <div>Mandate: {activeInnovation.mandate}</div>
            : <Link className="innovation-overview-add-concept-link" to="/update-innovation">
                <div>
                  <i className="fas fa-plus fa-2x add-concept-icon"></i>
                </div>
                <div>Add Innovation Mandate</div>
              </Link>
        }
      </ContentBox>

      {
        keyDatesSetup &&
          <ContentBox background={false}>
            <ProgressBar
              dates={Object.keys(activeInnovation.keyDates).map(label => activeInnovation.keyDates[label])}
              labels={Object.keys(activeInnovation.keyDates)}
            />
            <Link to={`/update-innovation`}>
              <div className="innovation-overview-edit-icon">Edit Key Dates</div>
            </Link>
          </ContentBox>
      }

      <div className="innovation-overview-toplinks">
        {
          !keyDatesSetup &&
            <Link className="innovation-overview-add-concept-link" to="/update-innovation">
              <div>
                <i className="fas fa-plus fa-2x add-concept-icon"></i>
              </div>
              <div>Setup Key Sprint Dates</div>
            </Link>
        }
        <Link className="innovation-overview-add-concept-link" to="/update-innovation">
          <div>
            <i className="fas fa-plus fa-2x add-concept-icon"></i>
          </div>
          <div>Edit Team Members</div>
        </Link>
        {
          keyDatesSetup &&
            <Link className="innovation-overview-add-concept-link" to={`/create-concept/${activeInnovation.id}`}>
              <div>
                <i className="fas fa-plus fa-2x add-concept-icon"></i>
              </div>
              <div>Add Concept</div>
            </Link>
        }
      </div>

      <ContentBox background={false}>
        <ConceptList concepts={activeIncomplete} title='Active & Incomplete' userType={userType} postIS2={isPostIS2} />
      </ContentBox>

      <ContentBox background={false}>
        <ConceptList concepts={activeComplete} title='Active & Ready' userType={userType} postIS2={isPostIS2} />
      </ContentBox>

      <ContentBox background={false}>
        <ConceptList concepts={activeReviewed} title='Active & Analysed' userType={userType} postIS2={isPostIS2} />
      </ContentBox>

      <ContentBox background={false}>
        <ConceptList concepts={killedConcepts} title='Killed Concepts' userType={userType} postIS2={isPostIS2} />
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
  activePartner: PropTypes.object,
  activeInnovation: PropTypes.object,
  conceptsById: PropTypes.object
};

const mapStateToProps = state => ({
  activePartner: state.partners.activePartner,
  activeInnovation: state.innovations.activeInnovation,
  conceptsById: state.concepts.conceptsById
});

export default connect(mapStateToProps, null)(InnovationOverview);
