import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptAddTitle from '../components/concept/ConceptAddTitle';
import ConceptAddDetails from '../components/concept/ConceptAddDetails';
import ConceptAddAttributes from '../components/concept/ConceptAddAttributes';

import UserProgressIndicator from '../components/UserProgressIndicator';
import ButtonNext from '../components/buttons/ButtonNext';

import '../styles/css/concept-create.css';

import { createConcept } from '../actions/concepts';

class ConceptCreate extends Component {
  state = {
    conceptName: '',
    logo: {},
    conceptStrapline: '',
    conceptDescription: '',
    selectedOpportunityAreas: [],
    selectedDvMatrixType: null,
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
    // const { conceptName, logo, conceptStrapline } = this.state;
    // const { conceptStrapline, conceptDescription } = this.state;
    // const { selectedOpportunityAreas, selectedDvMatrixType, selectedKeyTechnologies, selectedDvArchetypes } = this.state;
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
          </div>
          <div className="create-concept-user-actions">
            {backButton}
            {
              fieldsAreCompleted
                ? <ButtonNext label="Complete Setup" onClick={this.submitNewConcept} />
                : <ButtonNext disabled={true} label="Select at least one of each" />
            }
          </div>
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
