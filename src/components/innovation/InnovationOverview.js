import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';

import InnovationAddDates from './keydates/InnovationAddDates';
import InnovationAddTeam from './InnovationAddTeam';
import InnovationDetailsEditable from './InnovationDetailsEditable';
import PartnerDetailsEditable from './PartnerDetailsEditable';
import InnovationTeam from './InnovationTeam';
import ProgressBar from '../ProgressBar';
import ConceptList from '../concept/ConceptList';
import FormSectionHeader from '../formInputs/FormSectionHeader';
import ContentBox from '../layout/ContentBox';
import AccordionPanel from '../layout/AccordionPanel';
import FlexRow from '../layout/FlexRow';
import Modal from '../layout/Modal';

import '../../styles/css/innovation-overview.css';

import { makeArrayFromIndexedObject, getByKey } from '../../utils/functions';
import { editInnovation, getActiveInnovationData } from '../../actions/innovations';

class InnovationOverview extends Component {
  state = {
    openEditDates: false,
    openEditTeam: false,
    openAddMandate: false,
    mandateUpdated: false
  }

  componentDidMount() {
    const { activeInnovation, getActiveInnovationData, match: { params: { partnerId } } } = this.props;

    if(partnerId !== activeInnovation.partnerId) {
      getActiveInnovationData(partnerId);
    }

    window.scroll(0,0);
  }

  // For a more general version of this see ConceptOverviewEditable
  handleUpdateMandate = (e) => {
    const { activeInnovation, editInnovation } = this.props;
    editInnovation(activeInnovation.id, { [e.target.id]: e.target.value }, false);
    this.setState({ mandateUpdated: true });
  }

  mandateUpdateToDB = () => {
    const { editInnovation, activeInnovation: { id, mandate } } = this.props;
    editInnovation(id, { mandate }, true);
    this.setState({ mandateUpdated: false });
  }

  render() {
    const { activeInnovation, activePartner, conceptsById, teamMembers, authedUser } = this.props;
    const { openEditDates, openEditTeam } = this.state;
    const activeConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status !== 'killed');
    const activeIncomplete = activeConcepts.filter(concept => concept.status === 'draft');
    const activeComplete = activeConcepts.filter(concept => concept.status === 'ready');
    const activeReviewed = activeConcepts.filter(concept => concept.status === 'analysed');
    const killedConcepts = makeArrayFromIndexedObject(conceptsById).filter(concept => concept.status === 'killed');

    const is2Date = activeInnovation.keyDates ? getByKey(activeInnovation.keyDates, 'IS2', 'name') : [];
    const isPostIS2 = is2Date ? activeInnovation.keyDates && moment().isAfter(moment(is2Date[0].date)) : false;
    const keyDatesSetup = activeInnovation.keyDates && activeInnovation.keyDates.length > 0;

    const dates = [];
    const labels = [];
    activeInnovation.keyDates && activeInnovation.keyDates.forEach(keydate => {
      dates.push(keydate.date);
      labels.push(keydate.name);
    });

    const userType = authedUser.roleName;

    return (
      <div>
        <ContentBox background={false}>
          <Link to="/dashboard">&lt; Back to Dashboard</Link>
        </ContentBox>
        <ContentBox>
          <InnovationDetailsEditable />
        </ContentBox>

        {(activeInnovation.keyDates && activeInnovation.keyDates.length >= 4 && keyDatesSetup)
          ? <ContentBox background={false}>
            <ProgressBar
              dates={dates}
              labels={labels}
            />

            <div className="innovation-overview-edit-icon">
              <div className="innovation-overview-edit-dates-link" onClick={() => this.setState({ openEditDates: !openEditDates })}>
                <div className="innovation-overview-edit-team-label">Edit Key Dates</div>
                <div>
                  <i className="far fa-edit innovation-overview-edit-team-icon"></i>
                </div>
              </div>
            </div>
          </ContentBox>

          : <button className="cta-button" onClick={() => this.setState({ openEditDates: !openEditDates })}>
            Add Immersion Session Key Dates
          </button>
        }

        {openEditDates &&
          <Modal>
            <FormSectionHeader
              title='IS Dates'
              subtitle='Estimates are fine!'
            />
            <InnovationAddDates
              innovationId={activeInnovation.id}
              innovationOpenDate={activeInnovation.openDate}
              callback={() => this.setState({ openEditDates: false })}
            />
          </Modal>
        }

        <div className="innovation-overview-toplinks">
          {keyDatesSetup &&
            <Link className="innovation-overview-add-concept-link" to={`/create-concept/${activeInnovation.id}`}>
              <div>
                <i className="fas fa-plus fa-2x add-concept-icon"></i>
              </div>
              <div>Add Concept</div>
            </Link>
          }
        </div>

        {
          openEditTeam &&
            <Modal>
              <div className="create-innovation-section-container">
                <InnovationTeam
                  teamMembers={teamMembers}
                  minimal={true}
                />
              </div>

              <div className="create-innovation-section-container">
                <FormSectionHeader
                  title="Add New Team Members"
                  subtitle="Invites will be sent to all new team members when you click send"
                />
                <InnovationAddTeam
                  curTeamMembers={teamMembers}
                  partnerId={activePartner.id}
                  onCancel={() => this.setState({ openEditTeam: false })} />
              </div>
            </Modal>
        }

        {(activeIncomplete && activeIncomplete.length > 0) &&
          <AccordionPanel title='Active Concepts' initIsOpen={false}>
            <ContentBox background={false}>
              <ConceptList concepts={activeIncomplete} userType={userType} postIS2={isPostIS2} />
            </ContentBox>
          </AccordionPanel>
        }

        {
          (activeComplete && activeComplete.length > 0) &&
          <AccordionPanel title='Ready for Analysis' initIsOpen={false}>
            <ContentBox background={false}>
              <ConceptList concepts={activeComplete} userType={userType} postIS2={isPostIS2} />
            </ContentBox>
          </AccordionPanel>
        }

        {
          (activeReviewed && activeReviewed.length > 0) &&
          <AccordionPanel title='Analysed by VFT' initIsOpen={false}>
            <ContentBox background={false}>
              <ConceptList concepts={activeReviewed}  userType={userType} postIS2={isPostIS2} />
            </ContentBox>
          </AccordionPanel>
        }

        {
          (killedConcepts && killedConcepts.length > 0) &&
          <AccordionPanel title='Archived' initIsOpen={false}>
            <ContentBox background={false}>
              <ConceptList concepts={killedConcepts}  userType={userType} postIS2={isPostIS2} />
            </ContentBox>
          </AccordionPanel>
        }

        <FlexRow>
          <ContentBox>
            <h3 className="innovation-overview-edit-team-title">Team Members</h3>
            <div className="innovation-overview-edit-team-link" onClick={() => this.setState({ openEditTeam: !openEditTeam })}>
              <div className="innovation-overview-edit-team-label">Add/Remove</div>
              <div>
                <i className="far fa-edit innovation-overview-edit-team-icon"></i>
              </div>
            </div>
            <InnovationTeam
              teamMembers={teamMembers}
            />
          </ContentBox>
          <ContentBox>
            <PartnerDetailsEditable />
          </ContentBox>

        </FlexRow>
      </div>
    )
  }
}

InnovationOverview.propTypes = {
  activePartner: PropTypes.object,
  activeInnovation: PropTypes.object,
  conceptsById: PropTypes.object,
  history: PropTypes.object,
  editInnovation: PropTypes.func,
  getActiveInnovationData: PropTypes.func,
  match: PropTypes.object,
  teamMembers: PropTypes.array,
  authedUser: PropTypes.object
};

const mapStateToProps = state => ({
  activePartner: state.partners.activePartner,
  activeInnovation: state.innovations.activeInnovation,
  conceptsById: state.concepts.conceptsById,
  teamMembers: state.users.activeInnovationUsers,
  authedUser: state.auth.authedUser
});

const actions = { editInnovation, getActiveInnovationData };

export default connect(mapStateToProps, actions)(InnovationOverview);
