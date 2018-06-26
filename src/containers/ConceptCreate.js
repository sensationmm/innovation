import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import ConceptAddTitle from '../components/concept/ConceptAddTitle';
import ConceptAddDetails from '../components/concept/ConceptAddDetails';
import ConceptAddAttributes from '../components/concept/ConceptAddAttributes';

import ButtonNext from '../components/buttons/ButtonNext';

import '../styles/css/concept-create.css';

import { createConcept } from '../actions/concepts';

class ConceptCreate extends Component {
  state = {
    step: 1,
    conceptName: '',
    logo: {},
    conceptStrapline: '',
    conceptDescription: '',
    selectedOpportunityAreas: [],
    selectedDvMatrixType: '',
    selectedKeyTechnologies: [],
    selectedDvArchetypes: []
  }

  updateDetails = (key, value) => {
    this.setState({ [key]: value })
  }

  updateConceptLogo = (logo) => {
    this.setState({ logo });
  }

  // For multi-select checkboxes. Effectively a toggle on the id being in the array or not.
  updateAttributeArray = (arrayName, id) => {
    const arrayToUpdate = this.state[arrayName];
    const updatedArray = arrayToUpdate.includes(id)
                                      ? arrayToUpdate.filter(optionId => optionId !== id)
                                      : arrayToUpdate.concat(id)
    this.setState({ [arrayName]: updatedArray })
  }

  // For single select radio buttons.
  updateAttributeValue = (key, value) => {
    this.setState({ [key]: value })
  }

  submitNewConcept = () => {
    // Need to also send all user invites at this stage.
    console.log('state', this.state);
    console.log('Call create a new concept action');
  }

  fieldsAreCompleted = () => {
    const { step } = this.state;
    if (step === 1) {
      const { conceptName, logo } = this.state;
      return conceptName && logo;
    }
    if (step === 2) {
      const { conceptStrapline, conceptDescription } = this.state;
      return conceptStrapline && conceptDescription;
    }
    if (step === 3) {
      const { selectedOpportunityAreas, selectedDvMatrixType, selectedKeyTechnologies, selectedDvArchetypes } = this.state;

      return selectedOpportunityAreas.length > 0 &&
             selectedDvMatrixType !== '' &&
             selectedKeyTechnologies.length > 0 &&
             selectedDvArchetypes.length > 0;
    }
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
        <span className="step-back-link-text" onClick={() => this.setState({ step: step - 1})}>Back</span>
      </div>
    );
    return (
      <div>
        <div className="create-concept-page-title">Create Concept</div>
        <div className="process-step-count-container">
          <div className={step === 1 ? 'process-step-count active' : 'process-step-count'}>1</div>
          <div className={step === 2 ? 'process-step-count active' : 'process-step-count'}>2</div>
          <div className={step === 3 ? 'process-step-count active' : 'process-step-count'}>3</div>
        </div>
        <div>
          {
            step === 1 &&
            <div>
              <ConceptAddTitle
                conceptName={conceptName}
                updateConceptName={this.updateDetails}
                conceptLogo={logo}
                updateConceptLogo={this.updateConceptLogo}
              />
              {
                fieldsAreCompleted
                  ? <ButtonNext label="Next" onClick={() => this.setState({ step: step + 1 })} />
                  : <ButtonNext disabled={true} label="Next" />
              }
            </div>
          }
          {
            step === 2 &&
            <div>
              <ConceptAddDetails
                conceptStrapline={conceptStrapline}
                conceptDescription={conceptDescription}
                updateConceptDetails={this.updateDetails}
              />
              <div className="create-concept-user-actions">
                {backButton}
                {
                  fieldsAreCompleted
                    ? <ButtonNext label="Next" onClick={() => this.setState({ step: step + 1 })} />
                    : <ButtonNext disabled={true} label="Enter Details First" />
                }
              </div>
            </div>
          }
          {
            step === 3 &&
            <div>
              <ConceptAddAttributes
                selectedOpportunityAreas={selectedOpportunityAreas}
                selectedDvMatrixType={selectedDvMatrixType}
                selectedKeyTechnologies={selectedKeyTechnologies}
                selectedDvArchetypes={selectedDvArchetypes}
                updateAttributeArray={this.updateAttributeArray}
                updateAttributeValue={this.updateAttributeValue}
              />
              <div className="create-concept-user-actions">
                {backButton}
                {
                  fieldsAreCompleted
                    ? <ButtonNext label="Complete Setup" onClick={this.submitNewConcept} />
                    : <ButtonNext disabled={true} label="Select at least one of each" />
                }
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

// CreateConcept.propTypes = {
//  // TODO
// };
//
// const mapStateToProps = state => ({
//   // TODO
// });
//
const mapDispatchToProps = dispatch => ({
  createConcept: bindActionCreators(createConcept, dispatch)
});

export default connect(null, mapDispatchToProps)(ConceptCreate);
