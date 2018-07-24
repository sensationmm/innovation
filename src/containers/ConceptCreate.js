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

import FormSectionHeader from '../components/formInputs/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/concept-create.css';

import { createConcept, editConcept } from '../actions/concepts';
import  { removeNullValueAttrs } from '../utils/functions';

class ConceptCreate extends Component {

  state = {
    name: '',
    description: '',
    logo: {},
    marketSegment: '',
    marketFriction: '',
    marketSize: '',
    targetCustomers: '',
    targetIndustry: '',
    targetGeography: '',
    solutionDescription: '',
    primaryTechnology: '',
    successFactors: '',
    keyRisks: '',
    businessType: null,
    salesChannel: null,
    revenueModel: '',
    unitEconomics: '',
    corporateAdvantage: '',
    leveragedAssets: '',
    incubationCost: '',
    breakEvenCost: '',
    breakEvenYear: '',
    willGMLeave: null,
    gmConviction: null,
    gmComments: '',
    partnerPreferences: ''
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  updateConceptLogo = (logo) => {
    this.setState({ logo });
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

  handleSaveConcept = () => {
    const { createConcept, activeInnovationId } = this.props;
    const attrsToCreate = removeNullValueAttrs({ ...this.state })
    console.log('attrsToCreate', attrsToCreate);
    createConcept(activeInnovationId, attrsToCreate)
  }

  requiredFieldsAreCompleted = () => {
    const requiredFields = ['name']; // TODO: Move to config file.
    return requiredFields
      .every(attr => (this.state[attr] !== null && this.state[attr] !== '' && this.state[attr] !== {} && this.state[attr] !== undefined));
  }

  allFieldsAreCompleted = () => {
    return Object.values(this.state).every(field => (field !== null && field !== '' && field !== {} && field !== undefined));
  }

  render() {
    const { editExisting, editConcept, conceptId, activeConcept } = this.props;
    const requiredFieldsAreCompleted = this.requiredFieldsAreCompleted();
    const allFieldsAreCompleted = this.allFieldsAreCompleted();
    return (
      <div className="create-concept-container">
        <BackTextLink
          label="Back"
          onClick={() => this.props.history.goBack()}
        />
        <div className="create-concept-page-title">Create A New Concept</div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Concept Summary"
          />
          <ConceptBasicDetails
            updateFormField={this.updateFormField}
            updateConceptLogo={this.updateConceptLogo}
            name={this.state.name}
            description={this.state.description}
            logo={this.state.logo}
          />
        </div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Customers and Market"
          />
          <ConceptMarket
            updateFormField={this.updateFormField}
            customerSegment={this.state.marketSegment}
            friction={this.state.marketFriction}
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
            gmConviction={this.state.gmConviction}
            gmComments={this.state.GMComments}
            partnerPreferences={this.state.partnerPreferences}
          />
        </div>
          <div className="create-concept-user-actions">
            <BackTextLink
              label="Back"
              onClick={() => this.props.history.goBack()}
            />
            <div className="create-concept-user-actions-button-container">
              <ButtonSubmit
                label={requiredFieldsAreCompleted ? 'Save' : 'Complete Required Fields'}
                onClick={() => this.handleSaveConcept()}
                disabled={!requiredFieldsAreCompleted}
              />
            </div>
          </div>
      </div>
    )
  }
}

ConceptCreate.propTypes = {
  history: PropTypes.object,
  createConcept: PropTypes.func,
  activeInnovationId: PropTypes.number
};

const mapStateToProps = (state, props) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activeConcept: state.concepts.conceptsById[props.conceptId]
});

const actions = { createConcept, editConcept };

export default connect(mapStateToProps, actions)(ConceptCreate);
