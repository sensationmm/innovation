import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptBasicDetails from './createForm/ConceptBasicDetails';
import ConceptMarket from './createForm/ConceptMarket';
import ConceptSolution from './createForm/ConceptSolution';
import ConceptBusinessModel from './createForm/ConceptBusinessModel';
import ConceptCorpAdvantage from './createForm/ConceptCorpAdvantage';
import ConceptCosts from './createForm/ConceptCosts';
import ConceptConviction from './createForm/ConceptConviction';

import FormSectionHeader from '../formInputs/FormSectionHeader';
import ButtonSubmit from '../buttons/ButtonSubmit';
import ButtonDelete from '../buttons/ButtonDelete';
import KillButton from '../buttons/KillButton';
import CompleteButton from '../buttons/CompleteButton';

import '../../styles/css/concept-create.css';

import { editConcept, deleteConcept, addCanvas } from '../../actions/concepts';
import  { getDataUri } from '../../utils/functions';

import { conceptStatusLabels } from '../../config/conceptOptions';

class ConceptOverviewEditable extends Component {
  state = {
    editedFields: [],
    logo: {}
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
    this.setState({ logo: { preview: logo.preview} })
    editConcept(activeConcept.id, { logo } )
  }

  addCanvas = (attachments) => {
    const { activeConcept, addCanvas } = this.props;

    addCanvas(activeConcept.id, attachments, activeConcept.partnerId);
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

  saveStatusToDb = (newStatus) => {
    const { editConcept, activeConcept } = this.props;
    editConcept(activeConcept.id, { status: newStatus }, true);
  }

  saveChangesToDb = () => {
    const { editConcept, activeConcept } = this.props;
    const attrsToUpdate = {};

    this.state.editedFields.forEach(fieldKey => {
      attrsToUpdate[fieldKey] = activeConcept[fieldKey];
    })
    // If there is a logo uploaded, format it ready for saving to the DB.
    if (attrsToUpdate.logo) {
      const { logo: { preview }} = this.state;
      getDataUri(preview, function(dataUri) {
        attrsToUpdate.logo = dataUri;
        attrsToUpdate.logoName = preview;

        editConcept(activeConcept.id, attrsToUpdate, true);
      });
    } else {
      editConcept(activeConcept.id, attrsToUpdate, true);
    }
  }


  handleDeleteConcept = () => {
    const { deleteConcept, activeConcept, activePartnerId } = this.props;
    deleteConcept(activeConcept.id, `/innovation-overview/${activePartnerId}`);
  }

  // TODO: If not needed then remove.
  // Once complete 'Mark as Ready button is activated.
  // allFieldsAreCompleted = () => {
  //   const { activeConcept } = this.props;
  //   return Object.values(activeConcept).every(field =>
  //               field !== null &&
  //               field !== '' &&
  //               field !== undefined);
  // }

  render() {
    const { activeConcept, activePartnerId } = this.props;

    if (!activeConcept) {
      return null;
    }
    // const allFieldsAreCompleted = this.allFieldsAreCompleted(); TODO: If not needed then remove.
    const statusColor = {
      'killed': '#e03c31',
      'draft': 'snow',
      'ready': '#00bfb7',
      'analysed': '#ffa900'
    }
    return (
      <div className="create-concept-container">
        <div className="create-concept-page-title">Concept Overview: {activeConcept.name}</div>
        <div className="create-concept-user-actions">
          <div className="create-concept-user-actions-status" style={{ color: statusColor[activeConcept.status] }}>
            Status: {conceptStatusLabels[activeConcept.status]}
          </div>
          <div>
            {
              activeConcept.status !== 'killed' &&
                <KillButton
                  label="Archive"
                  onClick={() => this.saveStatusToDb('killed')}
                />
            }
            {
              activeConcept.status !== 'draft' &&
                <ButtonSubmit
                  label="Mark as Active"
                  onClick={() => this.saveStatusToDb('draft')}
                />
            }
            {
              activeConcept.status !== 'ready' &&
                <CompleteButton
                  label="Mark as Ready"
                  onClick={() => this.saveStatusToDb('ready')}
                />
            }
          </div>
        </div>
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
            canvases={activeConcept.canvases}
            addCanvas={this.addCanvas}
          />
        </div>
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
          <Link to={`/innovation-overview/${activePartnerId}`}>
            <span>
              <i className="fas fa-chevron-left"></i>
              <span> Back to Innovation Overview</span>
            </span>
          </Link>
          <div className="create-concept-user-actions-button-container">
            <ButtonSubmit
              label="Save Changes"
              onClick={() => this.saveChangesToDb()}
            />
            <ButtonDelete
              label="Delete Concept"
              onDelete={() => this.handleDeleteConcept()}
            />
          </div>
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
  conceptsById: PropTypes.object,
  activeConcept: PropTypes.object,
  existingLogo: PropTypes.bool,
  addCanvas: PropTypes.func
};

const actions = { editConcept, deleteConcept, addCanvas };

export default connect(null, actions)(ConceptOverviewEditable);
