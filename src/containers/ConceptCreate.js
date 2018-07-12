import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import ConceptAddTitle from '../components/concept/ConceptAddTitle';
import ConceptAddDetails from '../components/concept/ConceptAddDetails';
import ConceptAddAttributes from '../components/concept/ConceptAddAttributes';

import UserProgressIndicator from '../components/UserProgressIndicator';
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
    const { createConcept, activeInnovationId } = this.props;
    // Need to also send all user invites at this stage.
    console.log('state', this.state);
    console.log('Call create a new concept action');
    // TODO: Once concept attributes confirmed only pass that data from state, not entire state.
    createConcept(this.state, activeInnovationId);
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
        <UserProgressIndicator totalSteps={3} activeStep={step} />
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
              <div className="create-concept-user-actions step-1">
                {
                  fieldsAreCompleted
                    ? <ButtonNext label="Next" onClick={() => this.setState({ step: step + 1 })} />
                    : <ButtonNext disabled={true} label="Next" />
                }
              </div>
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

const mapStateToProps = state => ({
  activeInnovationId: state.innovations.activeInnovation.id,
});


const mapDispatchToProps = dispatch => ({
  createConcept: bindActionCreators(createConcept, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConceptCreate);
