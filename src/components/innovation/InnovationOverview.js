import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';

import InnovationUpdate from '../../containers/InnovationUpdate';
import CorporatePartnerSummary from './CorporatePartnerSummary';
import InnovationTeam from './InnovationTeam';
import ProgressBar from '../ProgressBar';
import ConceptList from '../concept/ConceptList';
import ContentBox from '../layout/ContentBox';
import FlexRow from '../layout/FlexRow';

import '../../styles/css/innovation-overview.css';

import { makeArrayFromIndexedObject } from '../../utils/functions';
import { requiredKeyDates } from  '../../config/innovationOptions';
const userType = 'finance'; // TODO: get this conditionally from  redux store auth.user

class InnovationOverview extends Component {
  state = {
    openEditDates: false,
    openEditTeam: false,
    openEditMandate: false
  }

  render() {
    const { activeInnovation, conceptsById } = this.props;
    const { openEditDates, openEditTeam, openEditMandate} = this.state;
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
              : <div className="innovation-overview-add-concept-link" onClick={() => this.setState({ openEditMandate: !openEditMandate })}>
                  <div>
                    <i className="fas fa-plus fa-2x add-concept-icon"></i>
                  </div>
                  <div>Add Innovation Mandate</div>
                </div>
          }
        </ContentBox>

        {
          keyDatesSetup &&
            <ContentBox background={false}>
              <ProgressBar
                dates={Object.keys(activeInnovation.keyDates).map(label => activeInnovation.keyDates[label])}
                labels={Object.keys(activeInnovation.keyDates)}
              />
              <div className="innovation-overview-edit-icon" onClick={() => this.setState({ openEditDates: !openEditDates })}>Edit Key Dates</div>
            </ContentBox>
        }

        <div className="innovation-overview-toplinks">
          {
            !keyDatesSetup &&
              <div className="innovation-overview-add-concept-link" onClick={() => this.setState({ openEditDates: !openEditDates })}>
                <div>
                  <i className="fas fa-plus fa-2x add-concept-icon"></i>
                </div>
                <div>Setup Key Sprint Dates</div>
              </div>
          }
          <div className="innovation-overview-add-concept-link" onClick={() => this.setState({ openEditTeam: !openEditTeam })}>
            <div>
              <i className="fas fa-plus fa-2x add-concept-icon"></i>
            </div>
            <div>Edit Team Members</div>
          </div>
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

        {
          (openEditDates || openEditTeam || openEditMandate) &&
            <InnovationUpdate innovationId={activeInnovation.id} openEditDates={openEditDates} openEditTeam={openEditTeam} openEditMandate={openEditMandate} />
        }

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
    )
  }
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
