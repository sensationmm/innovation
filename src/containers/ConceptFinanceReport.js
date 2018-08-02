import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FinanceReportInput from '../components/formInputs/FinanceReportInput';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import { updateConceptFinanceScore, saveConceptFinanceScore } from '../actions/financeScores';
import { getActiveInnovationData } from '../actions/innovations';
import { makeArrayFromIndexedObject } from '../utils/functions';

import { financeScoreOptions } from '../config/conceptOptions';

import '../styles/css/concept-finance-report.css'

class ConceptFinanceReport extends Component {
  state = {
    editedScores: [] // Array of finance score keys relating to finance score objects which have been changed.
  }

  componentDidMount() {
    this.checkConceptInnovation();
  }

  componentDidUpdate() {
    this.checkConceptInnovation();
  }

  checkConceptInnovation = () => {
    const { conceptsById, getActiveInnovationData } = this.props;

    if(!conceptsById || (Object.keys(conceptsById).length === 0 && conceptsById.constructor === Object)) {
      const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
      getActiveInnovationData(storedToken.activePartnerId);
    }
  }

  updateEditedScores = (key) => {
    const { editedScores } = this.state;
    if (!editedScores.includes(key)) {
      this.setState({ editedScores: editedScores.concat(key) });
    }
  }

  updateOption = (key, value, description, conceptId) => {
    const { updateConceptFinanceScore } = this.props;
    this.updateEditedScores(key);
    updateConceptFinanceScore(conceptId, key, { value, description })
  }

  updateComment = (key, comment, conceptId) => {
    const { updateConceptFinanceScore } = this.props;
    this.updateEditedScores(key);
    updateConceptFinanceScore(conceptId, key, { comment })
  }

  saveChangesToDb = (conceptId) => {
    const { saveConceptFinanceScore, scoresByConceptId, activePartnerId } = this.props;
    const { editedScores } = this.state;

    const arrayOfFinanceScores = makeArrayFromIndexedObject(scoresByConceptId[conceptId]);
    const changedFinanceScores = arrayOfFinanceScores.filter(score => editedScores.includes(score.key))

    saveConceptFinanceScore(conceptId, changedFinanceScores, `/innovation-overview/${activePartnerId}`);
    this.setState({ editedScores: [] });
  }

  allFieldsAreComplete = (financeScoresByKey) => {
    return Object.keys(financeScoresByKey).every(key => {
      return Object.entries(financeScoresByKey[key]).every(([ attrKey, attrValue ]) =>
        (attrValue !== null &&
        attrValue !== undefined &&
        attrValue !== '') ||
        attrKey === 'id' // id will always be null until some data is saved to the DB.
      )
    })
  }

  render() {
    const { scoresByConceptId, conceptName } = this.props;
    if (!scoresByConceptId) { return null }
    const { match: { params: { conceptId } } } = this.props;

    const financeScoresByKey = scoresByConceptId[conceptId];
    const allFieldsAreComplete = this.allFieldsAreComplete(financeScoresByKey);

    return (
      <div className="finance-report-container">
        <div className="finance-report-page-title">Concept Finance Report for: {conceptName}</div>
        <div className="finance-report-section-container">
          {
            Object.keys(financeScoresByKey).map(key => {
              const optionsObj = financeScoreOptions[key];
              const inputObj = financeScoresByKey[key];
              return (
                <FinanceReportInput
                  key={`finance-report-input-${key}`}
                  keyToUpdate={key}
                  title={optionsObj.title}
                  labels={optionsObj.labels}
                  selectedVaue={inputObj.value}
                  commentText={inputObj.comment}
                  updateOption={this.updateOption}
                  updateComment={this.updateComment}
                  conceptId={conceptId}
                  isRequired={true}
                />
              )
            })
          }

        <div className="create-innovation-user-actions">
          <BackTextLink
            label="Back"
            onClick={() => this.props.history.goBack()}
          />
          {
            !allFieldsAreComplete &&
              <div>Please complete all required fields</div>
          }
          {
            (allFieldsAreComplete && this.state.editedScores.length > 0) &&
              (
                <ButtonSubmit
                  label='Save'
                  onClick={() => this.saveChangesToDb(conceptId)}
                  disabled={!allFieldsAreComplete}
                />
              )
          }
        </div>
      </div>
    </div>
    )
  }
}

ConceptFinanceReport.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  scoresByConceptId: PropTypes.object,
  updateConceptFinanceScore: PropTypes.func,
  saveConceptFinanceScore: PropTypes.func,
  conceptName: PropTypes.string,
  activePartnerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  conceptsById: PropTypes.object,
  getActiveInnovationData: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  activePartnerId: state.partners.activePartner.id,
  scoresByConceptId: state.financeScores.scoresByConceptId,
  conceptsById: state.concepts.conceptsById,
  conceptName: state.concepts.conceptsById[props.match.params.conceptId] && state.concepts.conceptsById[props.match.params.conceptId].name
});

const actions = { updateConceptFinanceScore, saveConceptFinanceScore, getActiveInnovationData };

export default connect(mapStateToProps, actions)(ConceptFinanceReport);
