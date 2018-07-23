import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptSummary from '../components/concept/ConceptSummary';
import ConceptFinanceReport from './ConceptFinanceReport';
import ConceptMarket from '../components/concept/ConceptMarket';
import ConceptSolution from '../components/concept/ConceptSolution';
import ConceptBusinessModel from '../components/concept/ConceptBusinessModel';
import ConceptCorpAdvantage from '../components/concept/ConceptCorpAdvantage';
import ConceptCosts from '../components/concept/ConceptCosts';
import ConceptConviction from '../components/concept/ConceptConviction';

import FormSectionHeader from '../components/layout/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/concept-create.css';

import { createConcept, editConcept } from '../actions/concepts';

class ConceptCreate extends Component {

  state = {};

  // TODO: Look into this
  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  // If you want to re-compute some data only when a prop changes, use a memoization helper instead.
  static getDerivedStateFromProps = (nextProps, prevState) => {
    console.log('nextProps', nextProps);
    return { ...nextProps.activeConcept }
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

  handleSaveConcept = () => {
    const { editExisting, createConcept, editConcept, activeInnovationId, conceptId } = this.props;
    if (editExisting) {
      editConcept(conceptId, this.state);
    } else {
      createConcept(activeInnovationId, this.state)
    }
  }

  requiredFieldsAreCompleted = () => {
    const requiredFields = ['name', 'description']; // TODO: Move to config file.
    return requiredFields
      .every(attr => this.state[attr] !== null || this.state[attr] !== '' || this.state[attr] !== {} || this.state[attr] !== undefined);
  }

  allFieldsAreCompleted = () => {
    return Object.values(this.state).every(field => field !== null || field !== '' || field !== {} || field !== undefined);
  }

  render() {
    const { editExisting, editConcept, conceptId, activeConcept } = this.props;
    const requiredFieldsAreCompleted = this.requiredFieldsAreCompleted();
    const allFieldsAreCompleted = this.allFieldsAreCompleted();
    return (
      <div className="create-concept-container">
        <div className="create-concept-page-title">{editExisting ? 'Update Concept' : 'Create A New Concept'}</div>
        <div className="create-concept-section-container">
          <FormSectionHeader
            title="Concept Summary"
          />
          <ConceptSummary
            updateFormField={this.updateFormField}
            updateConceptLogo={this.updateConceptLogo}
            conceptName={this.state.name}
            conceptDescription={this.state.description}
            conceptLogo={this.state.logo}
          />
        </div>
        {
          activeConcept && activeConcept.status === 'reviewed' &&
            <div className="create-concept-section-container">
              <FormSectionHeader
                title="Finance Team Analysis"
              />
              <div>Venture Finance Team Analysis - Display Only</div>
            </div>
        }
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
              <div className="create-concept-user-actions-buttons">
                <ButtonSubmit
                  label={requiredFieldsAreCompleted ? 'Save' : 'Complete Required Fields'}
                  onClick={() => this.handleSaveConcept()}
                  disabled={!requiredFieldsAreCompleted}
                />
              </div>
              <div className="create-concept-user-actions-buttons">
                {
                  editExisting &&
                    <ButtonSubmit
                      label={allFieldsAreCompleted ? 'Mark as Complete' : 'Complete All Fields'}
                      onClick={() => editConcept(conceptId, { status: 'complete' })}
                      disabled={!allFieldsAreCompleted}
                    />
                }
            </div>
            </div>
          </div>
      </div>
    )
  }
}

ConceptCreate.propTypes = {
  history: PropTypes.object,
  createConcept: PropTypes.func,
  activeInnovationId: PropTypes.number,
  editExisting: PropTypes.bool // If true then populate fields from redux
};

const mapStateToProps = (state, props) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activeConcept: state.concepts.conceptsById[props.conceptId]
});

const actions = { createConcept, editConcept };

export default connect(mapStateToProps, actions)(ConceptCreate);
