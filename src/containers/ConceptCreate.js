import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

import '../styles/css/concept-create.css';

import { createConcept, addCanvas } from '../actions/concepts';
import  { removeNullValueAttrs, getDataUri } from '../utils/functions';

class ConceptCreate extends Component {

  state = {
    name: '',
    description: '',
    logo: {},
    marketSegment: '',
    marketFriction: '',
    marketSize: '',
    targetCustomers: '',
    targetIndustryId: '',
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
    willGmLeave: null,
    gmConviction: null,
    gmComments: '',
    partnerPreferences: '',
    canvases: [],
    canvasObjects: []
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  updateConceptLogo = (logo) => {
    this.setState({ logo });
  }

  addCanvas = (attachments) => {
    this.setState({
      ...this.state,
      canvases: attachments.map(attachment => attachment.preview),
      canvasObjects: attachments
    });
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

  handleSaveConcept = (redirectUrl) => {
    const { createConcept, activeInnovationId } = this.props;
    const attrsToCreate = removeNullValueAttrs({ ...this.state });
    // If there is a logo uploaded, format it ready for saving to the DB.
    if (attrsToCreate.logo) {
      const { logo: { preview }} = this.state;
      getDataUri(preview, function(dataUri) {
        attrsToCreate.logo = dataUri;
        attrsToCreate.logoName = preview;
        createConcept(activeInnovationId, attrsToCreate);
      });
    } else {
      console.log('redirectUrl', redirectUrl);
      createConcept(activeInnovationId, attrsToCreate, redirectUrl);
    }
  }

  requiredFieldsAreCompleted = () => {
    const requiredFields = [ 'name', 'targetIndustryId' ]; // TODO: Move to config file.
    return requiredFields
      .every(attr => (this.state[attr] !== null && this.state[attr] !== '' && this.state[attr] !== {} && this.state[attr] !== undefined));
  }

  render() {
    const { activePartnerId } = this.props;
    const requiredFieldsAreCompleted = this.requiredFieldsAreCompleted();
    return (
      <div className="create-concept-container">
        <Link to={activePartnerId ? `/innovation-overview/${activePartnerId}` : '/dashboard'}>
          <span>
            <i className="fas fa-chevron-left"></i>
            <span> Back to Innovation Overview</span>
          </span>
        </Link>
        <div className="create-concept-page-title">
          <span>Create A New Concept</span>
        </div>
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
            existingLogo={false}
            canvases={this.state.canvases}
            addCanvas={this.addCanvas}
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
            targetIndustryId={this.state.targetIndustryId}
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
            willGmLeave={this.state.willGmLeave}
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
            <Link to={activePartnerId ? `/innovation-overview/${activePartnerId}` : '/dashboard'}>
              <span>
                <i className="fas fa-chevron-left"></i>
                <span> Back to Innovation Overview</span>
              </span>
            </Link>
            <div className="create-concept-user-actions-button-container">
              {
                requiredFieldsAreCompleted
                  ? (
                    <div>
                      <ButtonSubmit
                        label="Save"
                        onClick={() => this.handleSaveConcept(`/innovation-overview/${activePartnerId}`)}
                        disabled={!requiredFieldsAreCompleted}
                      />
                      <ButtonSubmit
                        label="Save and add another"
                        onClick={() => this.handleSaveConcept(this.props.match.url)}
                        disabled={!requiredFieldsAreCompleted}
                      />
                    </div>
                  )
                  : <div>Please complete required fields</div>
              }
            </div>
          </div>
      </div>
    )
  }
}

ConceptCreate.propTypes = {
  history: PropTypes.object,
  createConcept: PropTypes.func,
  activeInnovationId: PropTypes.string,
  activePartnerId: PropTypes.string,
  match: PropTypes.object,
  addCanvas: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activePartnerId: state.innovations.activeInnovation.partnerId
});

const actions = { createConcept, addCanvas };

export default connect(mapStateToProps, actions)(ConceptCreate);
