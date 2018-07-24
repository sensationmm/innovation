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

import FormSectionHeader from '../components/layout/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/concept-create.css';

import { editConcept } from '../actions/concepts';

class ConceptOverviewEditable extends Component {

  updateDetails = (key, value) => {
    const { editConcept, activeConcept } = this.props;
    editConcept(activeConcept.id, { key: value })
  }

  updateFormField = (e) => {
    const { editConcept, activeConcept } = this.props;
    editConcept(activeConcept.id, { [e.target.id]: e.target.value } )
  }

  updateConceptLogo = (logo) => {
    const { editConcept, activeConcept } = this.props;
    editConcept(activeConcept.id, { logo } )
  }

  // For single select options
  selectOption = (key, value) => {
    const { editConcept, activeConcept } = this.props;
    editConcept(activeConcept.id, { [key]: value } )
  }

  // For multi-select checkboxes. Effectively a toggle on the id being in the array or not.
  updateSelectedOptions = (arrayName, toggleId) => {
    const { editConcept, activeConcept } = this.props;
    const arrayToUpdate = activeConcept[arrayName];
    const updatedArray = arrayToUpdate.includes(toggleId)
                                      ? arrayToUpdate.filter(optionId => optionId !== toggleId)
                                      : arrayToUpdate.concat(toggleId)
    editConcept(activeConcept.id, { [arrayName]: updatedArray })
  }

  requiredFieldsAreCompleted = () => {
    const { activeConcept } = this.props;
    const requiredFields = ['name', 'description']; // TODO: Move to config file.
    return requiredFields
      .every(attr => activeConcept[attr] !== null || activeConcept[attr] !== '' || activeConcept[attr] !== {} || activeConcept[attr] !== undefined);
  }

  allFieldsAreCompleted = () => {
    const { activeConcept } = this.props;
    return Object.values(activeConcept).every(field => field !== null || field !== '' || field !== {} || field !== undefined);
  }

  render() {
    const { editConcept, activeConcept } = this.props;
    if (!activeConcept) {
      return null;
    }
    console.log('activeConcept', activeConcept.status);
    const requiredFieldsAreCompleted = this.requiredFieldsAreCompleted();
    const allFieldsAreCompleted = this.allFieldsAreCompleted();
    return (
      <div className="create-concept-container">
        <div className="create-concept-user-actions">
          <BackTextLink
            label="Back"
            onClick={() => this.props.history.goBack()}
          />
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
            targetIndustry={activeConcept.targetIndustry}
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
            willGMLeave={activeConcept.willGMLeave}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Conviction"
          />
          <ConceptConviction
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            gmConviction={activeConcept.gmConviction}
            gmComments={activeConcept.gmComments}
            partnerPreferences={activeConcept.partnerPreferences}
          />
        </div>
          <div className="create-concept-user-actions">
            <BackTextLink
              label="Back"
              onClick={() => this.props.history.goBack()}
            />
          </div>
      </div>
    )
  }
}

ConceptOverviewEditable.propTypes = {
  history: PropTypes.object,
  createConcept: PropTypes.func,
  activeInnovationId: PropTypes.number,
  editExisting: PropTypes.bool // If true then populate fields from redux
};

const mapStateToProps = (state, props) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activeConcept: state.concepts.conceptsById[props.match.params.conceptId]
});

const actions = { editConcept };

export default connect(mapStateToProps, actions)(ConceptOverviewEditable);
