import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptSummary from '../components/concept/ConceptSummary';
import ConceptMarket from '../components/concept/ConceptMarket';
import ConceptSolution from '../components/concept/ConceptSolution';
import ConceptBusinessModel from '../components/concept/ConceptBusinessModel';
import ConceptCorpAdvantage from '../components/concept/ConceptCorpAdvantage';
import ConceptCosts from '../components/concept/ConceptCosts';
import ConceptConviction from '../components/concept/ConceptConviction';
// import ConceptAddDetails from '../components/concept/ConceptAddDetails';
// import ConceptAddAttributes from '../components/concept/ConceptAddAttributes';

import FormTextInput from '../components/layout/FormTextInput';
import FormSectionHeader from '../components/layout/FormSectionHeader';
import ButtonNext from '../components/buttons/ButtonNext';

import '../styles/css/concept-create.css';

import { createConcept } from '../actions/concepts';

class ConceptCreate extends Component {
  state = {
    conceptName: '',
    conceptDescription: '',
    conceptLogo: {},
    customerSegment: '',
    friction: '',
    marketSize: '',
    targetCustomers: '',
    targetIndustry: '',
    targetGeography: '',
    solutionDescription: '',
    primaryTechnology: '',
    successFactors: '',
    keyRisks: '',
    businessType: [],
    salesChannel: [],
    revenueModel: '',
    unitEconomics: '',
    corporateAdvantage: '',
    leveragedAssets: '',
    incubationCost: '',
    breakEvenCost: '',
    breakEvenYear: '',
    willGMLeave: [],
    GMRank: [],
    GMComments: '',
    CPPreferences: ''
  }

  updateDetails = (key, value) => {
    this.setState({ [key]: value })
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  updateConceptLogo = (conceptLogo) => {
    this.setState({ conceptLogo });
  }

  // For single select options
  selectOption = (key, value) => {
    this.setState({ [key]: value })
  }

  // For multi-select checkboxes. Effectively a toggle on the id being in the array or not.
  updateSelectedOptions = (arrayName, id) => {
    const arrayToUpdate = this.state[arrayName];
    const updatedArray = arrayToUpdate.includes(id)
                                      ? arrayToUpdate.filter(optionId => optionId !== id)
                                      : arrayToUpdate.concat(id)
    this.setState({ [arrayName]: updatedArray })
  }

  submitNewConcept = () => {
    const { createConcept, activeInnovationId } = this.props;
    // Need to also send all user invites at this stage.
    console.log('state', this.state);
    console.log('Call create a new concept action');
    // TODO: Once concept attributes confirmed only pass that data from state, not entire state.
    createConcept(this.state, activeInnovationId);
  }

  fieldsAreCompleted = () => {
    const { conceptName } = this.state;
    return conceptName;
  }

  render() {
    const {
      step, conceptName, logo, conceptStrapline, conceptDescription,
      selectedOpportunityAreas, selectedDvMatrixType, selectedKeyTechnologies, selectedDvArchetypes
    } = this.state;
    const fieldsAreCompleted = this.fieldsAreCompleted();
    const backButton = (
      <div className="step-back-link">
        <i className="fas fa-chevron-left"></i>
        <span className="step-back-link-text"
          onClick={() => this.props.history.goBack()}
        >Back</span>
      </div>
    );
    return (
      <div className="create-concept-container">
        <div className="create-concept-page-title">Create A New Concept</div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Concept Summary"
          />
          <ConceptSummary
            updateFormField={this.updateFormField}
            updateConceptLogo={this.updateConceptLogo}
            conceptName={this.state.conceptName}
            conceptDescription={this.state.conceptDescription}
            conceptLogo={this.state.conceptLogo}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Customers and Market"
          />
          <ConceptMarket
            updateFormField={this.updateFormField}
            customerSegment={this.state.customerSegment}
            friction={this.state.friction}
            marketSize={this.state.marketSize}
            targetCustomers={this.state.targetCustomers}
            targetIndustry={this.state.targetIndustry}
            targetGeography={this.state.targetGeography}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Solution Details"
          />
          <ConceptSolution
            updateFormField={this.updateFormField}
            solutionDescription={this.state.solutionDescription}
            primaryTechnology={this.state.primaryTechnology}
            successFactors={this.state.successFactors}
            keyRisks={this.state.keyRisks}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Business Model"
          />
          <ConceptBusinessModel
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            businessType={this.state.businessType}
            salesChannel={this.state.salesChannel}
            revenueModel={this.state.revenueModel}
            unitEconomics={this.state.unitEconomics}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Corporate Advantage"
          />
          <ConceptCorpAdvantage
            updateFormField={this.updateFormField}
            corporateAdvantage={this.state.corporateAdvantage}
            leveragedAssets={this.state.leveragedAssets}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Cost and Implementation"
          />
          <ConceptCosts
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            incubationCost={this.state.incubationCost}
            breakEvenCost={this.state.breakEvenCost}
            breakEvenYear={this.state.breakEvenYear}
            willGMLeave={this.state.willGMLeave}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Conviction"
          />
          <ConceptConviction
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            GMRank={this.state.GMRank}
            GMComments={this.state.GMComments}
            CPPreferences={this.state.CPPreferences}
          />
        </div>






        {/* <div className="create-concept-page-title">Create Concept</div>
        <div>
          <div>
            <ConceptAddTitle
              conceptName={conceptName}
              updateConceptName={this.updateDetails}
              conceptLogo={logo}
              updateConceptLogo={this.updateConceptLogo}
            />
          </div>
          <div>
            <ConceptAddDetails
              conceptStrapline={conceptStrapline}
              conceptDescription={conceptDescription}
              updateConceptDetails={this.updateDetails}
            />
          </div>
          <div>
            <ConceptAddAttributes
              selectedOpportunityAreas={selectedOpportunityAreas}
              selectedDvMatrixType={selectedDvMatrixType}
              selectedKeyTechnologies={selectedKeyTechnologies}
              selectedDvArchetypes={selectedDvArchetypes}
              updateAttributeArray={this.updateAttributeArray}
              updateAttributeValue={this.updateAttributeValue}
            />
          </div> */}
          <div className="create-concept-user-actions">
            {backButton}
            {
              fieldsAreCompleted
                ? <ButtonNext label="Save" onClick={() => this.submitNewConcept()} />
                : <ButtonNext disabled={true} label="Complete Required Fields" />
            }
          </div>
      </div>
    )
  }
}

ConceptCreate.propTypes = {
 createConcept: PropTypes.func,
 activeInnovationId: PropTypes.number
};


const mapStateToProps = state => ({
  activeInnovationId: state.innovations.activeInnovation.id,
});


const mapDispatchToProps = dispatch => ({
  createConcept: bindActionCreators(createConcept, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConceptCreate);
