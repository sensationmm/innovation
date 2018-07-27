import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';

import InnovationAddDates from './keydates/InnovationAddDates';
import InnovationAddTeam from './InnovationAddTeam';
import CorporatePartnerSummary from './CorporatePartnerSummary';
import InnovationTeam from './InnovationTeam';
import ProgressBar from '../ProgressBar';
import ConceptList from '../concept/ConceptList';
import FormSectionHeader from '../formInputs/FormSectionHeader';
import ContentBox from '../layout/ContentBox';
import FlexRow from '../layout/FlexRow';

import '../../styles/css/innovation-overview.css';

import { makeArrayFromIndexedObject } from '../../utils/functions';
const userType = 'teamGM'; // TODO: get this conditionally from  redux store auth.user
const curTeamMembers = [ // TODO: get from partner.users in redux store (also duplicated in InnovationAddTeam)
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Stavros', position: 'GM'}, {name: 'Barry', position: 'VA'},
  {name: 'Clem', position: 'SD'}, {name: 'Geraldine', position: 'Engineer'}
];

class InnovationOverview extends Component {
  state = {
    openEditDates: false,
    openEditTeam: false,
    openEditMandate: false
  }

  render() {
    const { activeInnovation, activePartner, conceptsById } = this.props;
    const { openEditDates, openEditTeam, openEditMandate} = this.state;
    const activeConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status !== 'killed');
    const activeIncomplete = activeConcepts.filter(concept => concept.status === 'draft');
    const activeComplete = activeConcepts.filter(concept => concept.status === 'ready');
    const activeReviewed = activeConcepts.filter(concept => concept.status === 'analysed');
    const killedConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status === 'killed');

    const isPostIS2 = activeInnovation.keyDates && moment().isAfter(moment(activeInnovation.keyDates.IS2));
    const keyDatesSetup = true; // TODO: Write check to make sure all the required dates are found in keyDates array.

    let dates = [];
    let labels = [];
    activeInnovation.keyDates && activeInnovation.keyDates.forEach(keydate => {
      dates.push(keydate.date);
      labels.push(keydate.name);
    });

    return (
      <div>
        <ContentBox>
          <h1>{activeInnovation.sprintName}</h1>
          <div>{activeInnovation.sprintType}</div>
          <div>Duration: {activeInnovation.duration} weeks</div>
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
          (activeInnovation.keyDates && keyDatesSetup) &&
            <ContentBox background={false}>
              <ProgressBar
                dates={dates}
                labels={labels}
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
          openEditDates &&
            <div className="create-innovation-section-container">
              <FormSectionHeader
                title='Enter Immersion Session Key Dates'
                subtitle='These are required to create your innovation timeline, you can edit these later if you need to'
              />
              <InnovationAddDates innovationId={activeInnovation.id} />
            </div>
        }
        {
          openEditTeam &&
            <div>
              <div className="create-innovation-section-container">
                <FormSectionHeader
                  title='Your Current Team'
                />
                <InnovationTeam
                  teamMembers={curTeamMembers}
                />
              </div>

              <div className="create-innovation-section-container">
                <FormSectionHeader
                  title="Add New Team Members"
                  subtitle="Invites will be sent to new team members when you save"
                />
                <InnovationAddTeam partnerId={activePartner.id} />
              </div>
            </div>
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
              name={activePartner.name}
              industry={activePartner.industry}
              city={activePartner.hqCity}
              businessDescription={activePartner.description}
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
