import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptBasicDetails from '../components/concept/createForm/ConceptBasicDetails';
import ConceptMarket from '../components/concept/createForm/ConceptMarket';
import ConceptSolution from '../components/concept/createForm/ConceptSolution';
import ConceptBusinessModel from '../components/concept/createForm/ConceptBusinessModel';
import ConceptCorpAdvantage from '../components/concept/createForm/ConceptCorpAdvantage';
import ConceptCosts from '../components/concept/createForm/ConceptCosts';
import ConceptConviction from '../components/concept/createForm/ConceptConviction';
import VFTScoresDisplay from '../components/concept/VFTScores/VFTScoresDisplay';

import FormSectionHeader from '../components/formInputs/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/concept-create.css';

import { editConcept, deleteConcept } from '../actions/concepts';
import { getActiveInnovationData } from '../actions/innovations';

class ConceptOverviewEditable extends Component {
  state = {
    editedFields: []
  }

  componentDidMount() {
    this.checkConceptInnovation();
  }

  componentDidUpdate() {
    this.checkConceptInnovation();
  }

  checkConceptInnovation = () => {
    const { activeConcept, conceptsById } = this.props;

    if(!conceptsById) {
      const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
      this.props.getActiveInnovationData(storedToken.activePartnerId);
    } else if(!activeConcept) {
      this.props.history.push('/dashboard');
    }
  }

  updateEditedFields = (key) => {
    const { editedFields } = this.state;
    if (!editedFields.includes(key)) {
      this.setState({ editedFields: editedFields.concat(key) });
    }
  }

  updateFormField = (e) => {
    const { editConcept, activeConcept } = this.props;
    this.updateEditedFields(e.target.id);
    editConcept(activeConcept.id, { [e.target.id]: e.target.value } )
  }

  updateConceptLogo = (logo) => {
    const { editConcept, activeConcept } = this.props;
    this.updateEditedFields('logo');
    editConcept(activeConcept.id, { logo } )
  }

  // For single select options
  selectOption = (key, value) => {
    const { editConcept, activeConcept } = this.props;
    this.updateEditedFields(key);
    editConcept(activeConcept.id, { [key]: value } )
  }

  // For multi-select checkboxes. Effectively a toggle on the id being in the array or not.
  updateSelectedOptions = (arrayName, toggleId) => {
    const { editConcept, activeConcept } = this.props;
    this.updateEditedFields(arrayName);
    const arrayToUpdate = activeConcept[arrayName];
    const updatedArray = arrayToUpdate.includes(toggleId)
                                      ? arrayToUpdate.filter(optionId => optionId !== toggleId)
                                      : arrayToUpdate.concat(toggleId)
    editConcept(activeConcept.id, { [arrayName]: updatedArray })
  }

  saveChangesToDB = () => {
    const { editConcept, activeConcept } = this.props;
    const attrsToUpdate = {};
    this.state.editedFields.forEach(fieldKey => {
      attrsToUpdate[fieldKey] = activeConcept[fieldKey];
    })
    editConcept(activeConcept.id, attrsToUpdate, true);
  }

  handleDeleteConcept = () => {
    const { deleteConcept, activeConcept, activePartnerId } = this.props;
    deleteConcept(activeConcept.id, `/innovation-overview/${activePartnerId}`);
  }

  // Once complete 'Mark as Ready button is activated.
  allFieldsAreCompleted = () => {
    const { activeConcept } = this.props;
    return Object.values(activeConcept).every(field =>
                field !== null &&
                field !== '' &&
                field !== undefined);
  }

  render() {
    const { activeConcept } = this.props;

    if (!activeConcept) {
      return null;
    }

    const allFieldsAreCompleted = this.allFieldsAreCompleted();

    return (
      <div className="create-concept-container">
        <div className="create-concept-user-actions">
          <BackTextLink
            label="Back"
            onClick={() => this.props.history.goBack()}
          />
          <div>
            <div>Status: {activeConcept.status}</div>
            <ButtonSubmit
              label="Mark as Killed"
              onClick={() => this.selectOption('status', 'killed')}
            />
            <ButtonSubmit
              label="Mark as Draft"
              onClick={() => this.selectOption('status', 'draft')}
            />
            <ButtonSubmit
              label={allFieldsAreCompleted ? 'Mark as Ready' : 'Fields Incomplete'}
              onClick={() => this.selectOption('status', 'ready')}
              disabled={!allFieldsAreCompleted}
            />

          </div>
        </div>
        <div className="create-concept-page-title">Update Concept</div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Concept Summary"
          />
          <ConceptBasicDetails
            updateFormField={this.updateFormField}
            updateConceptLogo={this.updateConceptLogo}
            name={activeConcept.name}
            description={activeConcept.description}
            logo={activeConcept.logo}
            existingLogo={true}
          />
        </div>
        {
          activeConcept.status === 'reviewed' &&
            <div className="create-concept-section-container">
              <FormSectionHeader
                title="VFT Scores"
              />
              <VFTScoresDisplay
                stats={[
                  { label: 'VFTConceptScore', content: activeConcept.VFTConceptScore },
                  { label: 'VFTComments', content: activeConcept.VFTComments },
                  { label: 'VFTSolutionScore', content: activeConcept.VFTSolutionScore },
                  { label: 'VFTModelScore', content: activeConcept.VFTModelScore },
                  { label: 'VFTMarketScore', content: activeConcept.VFTMarketScore },
                ]}
                isStats
                stacked
              />
            </div>
        }
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Customers and Market"
          />
          <ConceptMarket
            updateFormField={this.updateFormField}
            marketSegment={activeConcept.marketSegment}
            marketFriction={activeConcept.marketFriction}
            marketSize={activeConcept.marketSize}
            targetCustomers={activeConcept.targetCustomers}
            targetIndustryId={activeConcept.targetIndustryId}
            targetGeography={activeConcept.targetGeography}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Solution Details"
          />
          <ConceptSolution
            updateFormField={this.updateFormField}
            solutionDescription={activeConcept.solutionDescription}
            primaryTechnology={activeConcept.primaryTechnology}
            successFactors={activeConcept.successFactors}
            keyRisks={activeConcept.keyRisks}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Business Model"
          />
          <ConceptBusinessModel
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            businessType={activeConcept.businessType}
            salesChannel={activeConcept.salesChannel}
            revenueModel={activeConcept.revenueModel}
            unitEconomics={activeConcept.unitEconomics}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Corporate Advantage"
          />
          <ConceptCorpAdvantage
            updateFormField={this.updateFormField}
            corporateAdvantage={activeConcept.corporateAdvantage}
            leveragedAssets={activeConcept.leveragedAssets}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Cost and Implementation"
          />
          <ConceptCosts
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            incubationCost={activeConcept.incubationCost}
            breakEvenCost={activeConcept.breakEvenCost}
            breakEvenYear={activeConcept.breakEvenYear}
            willGmLeave={activeConcept.willGmLeave}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Conviction"
          />
          <ConceptConviction
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            gmConviction={activeConcept.gmConviction || null} // Can't pass an empty string to RankSelectForm component.
            gmComments={activeConcept.gmComments}
            partnerPreferences={activeConcept.partnerPreferences}
          />
        </div>
          <div className="create-concept-user-actions">
            <BackTextLink
              label="Back"
              onClick={() => this.props.history.goBack()}
            />
            <ButtonSubmit
              label="Save Changes"
              onClick={() => this.saveChangesToDB()}
            />
            <ButtonSubmit
              label="Delete Concept"
              onClick={() => this.handleDeleteConcept()}
            />
          </div>
      </div>
    )
  }
}

ConceptOverviewEditable.propTypes = {
  history: PropTypes.object,
  createConcept: PropTypes.func,
  editConcept: PropTypes.func,
  deleteConcept: PropTypes.func,
  activeInnovationId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  activePartnerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  conceptsById: PropTypes.array,
  activeConcept: PropTypes.object,
  existingLogo: PropTypes.bool,
  getActiveInnovationData: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activePartnerId: state.partners.activePartner.id,
  conceptsById: state.concepts.conceptsById,
  activeConcept: (state.concepts.conceptsById && state.concepts.conceptsById[props.match.params.conceptId]) || null
});

const actions = { editConcept, deleteConcept, getActiveInnovationData };

export default connect(mapStateToProps, actions)(ConceptOverviewEditable);
