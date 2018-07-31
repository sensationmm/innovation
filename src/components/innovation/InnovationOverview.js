import React, { Component } from 'react';
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
import ButtonSubmit from '../buttons/ButtonSubmit';
import FormTextInput from '../formInputs/FormTextInput';
import Modal from '../layout/Modal';

import '../../styles/css/innovation-overview.css';

import { makeArrayFromIndexedObject, getByKey } from '../../utils/functions';
import { editInnovation, getActiveInnovationData } from '../../actions/innovations';

const userType = 'finance'; // TODO: get this conditionally from  redux store auth.user
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
    openEditMandate: false,
    mandateUpdated: false // TODO: May way to generalise this to be updatedFields as per concept overview if there are to be more inline editable fields on this page.
  }

  componentDidMount() {
    const { activeInnovation, getActiveInnovationData, match: { params: { innovationId } } } = this.props;

    if(innovationId !== activeInnovation.partnerId) {
      getActiveInnovationData(innovationId);
    }
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
    const { activeInnovation, activePartner, conceptsById } = this.props;
    const { openEditDates, openEditTeam, mandateUpdated } = this.state;
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

    return (
      <div>
        <ContentBox background={false}>
          <Link to="/dashboard">&lt; Back to Dashboard</Link>
        </ContentBox>

        <ContentBox>
          <h1>{activeInnovation.sprintName}</h1>
          <div>Innovation Type: {activeInnovation.sprintType}</div>
          <div>Duration: {activeInnovation.duration} weeks</div>
          <div className="innovation-overview-mandate-input">
            <FormTextInput
              id='mandate'
              placeholder='Innovation Mandate'
              onChange={this.handleUpdateMandate}
              value={activeInnovation.mandate || ''} // TODO: Format all null values in getActiveInnovationData action?
            />

            {mandateUpdated &&
              <ButtonSubmit
                label="Save"
                onClick={() => this.mandateUpdateToDB()}
              />
            }
          </div>
        </ContentBox>

        {(activeInnovation.keyDates && activeInnovation.keyDates.length >= 4 && keyDatesSetup)
          ? <ContentBox background={false}>
            <ProgressBar
              dates={dates}
              labels={labels}
            />
            <div className="innovation-overview-edit-icon">
              <button className="form-submit-button" onClick={() => this.setState({ openEditDates: !openEditDates })}>
                Edit Key Dates
              </button>
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
          <div className="innovation-overview-add-concept-link" onClick={() => this.setState({ openEditTeam: !openEditTeam })}>
            <div>
              <i className="fas fa-plus fa-2x add-concept-icon"></i>
            </div>
            <div>Edit Team Members</div>
          </div>
          {keyDatesSetup &&
            <Link className="innovation-overview-add-concept-link" to={`/create-concept/${activeInnovation.id}`}>
              <div>
                <i className="fas fa-plus fa-2x add-concept-icon"></i>
              </div>
              <div>Add Concept</div>
            </Link>
          }
        </div>

        {openEditTeam &&
          <Modal>
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
          </Modal>
        }

        {(activeIncomplete && activeIncomplete.length > 0) &&
          <ContentBox background={false}>
            <ConceptList concepts={activeIncomplete} title='Active & Incomplete' userType={userType} postIS2={isPostIS2} />
          </ContentBox>
        }

        {
          (activeComplete && activeComplete.length > 0) &&
            <ContentBox background={false}>
              <ConceptList concepts={activeComplete} title='Active & Ready' userType={userType} postIS2={isPostIS2} />
            </ContentBox>
        }

        {
          (activeReviewed && activeReviewed.length > 0) &&
            <ContentBox background={false}>
              <ConceptList concepts={activeReviewed} title='Active & Analysed' userType={userType} postIS2={isPostIS2} />
            </ContentBox>
        }

        {
          (killedConcepts && killedConcepts.length > 0) &&
            <ContentBox background={false}>
              <ConceptList concepts={killedConcepts} title='Killed Concepts' userType={userType} postIS2={isPostIS2} />
            </ContentBox>
        }

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
              industry={activePartner.industryName}
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
  conceptsById: PropTypes.object,
  history: PropTypes.object,
  editInnovation: PropTypes.func,
  getActiveInnovationData: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  activePartner: state.partners.activePartner,
  activeInnovation: state.innovations.activeInnovation,
  conceptsById: state.concepts.conceptsById
});

const actions = { editInnovation, getActiveInnovationData };

export default connect(mapStateToProps, actions)(InnovationOverview);
