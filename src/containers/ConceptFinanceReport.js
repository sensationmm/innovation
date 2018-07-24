import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VFTConceptOverview from '../components/concept/VFTScores/VFTConceptOverview';
import VFTConceptScores from '../components/concept/VFTScores/VFTConceptScores';
import VFTScoresDisplay from '../components/concept/VFTScores/VFTScoresDisplay';
import FormSectionHeader from '../components/layout/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/concept-finance-report.css'

class ConceptFinanceReport extends Component {
  state = {
    conceptRank: null,
    VFComments: '',
    solutionScore: null,
    businessModelScore: null,
    marketSizeScore: null,
    corpAdvantageScore: null
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  selectOption = (key, value) => {
    this.setState({ [key]: value })
  }

  createConceptFinanceReport = () => {
    const { match: { params: { conceptId } } } = this.props;
    console.log('create finance on concept', conceptId);
    console.log('create finance report with', this.state);
  }

  render() {
    return (
      <div className="finance-report-container">
        <div className="finance-report-page-title">Concept Finance Report</div>
        <div className="finance-report-section-container">
          <FormSectionHeader
            title="Concept Overview"
          />
          <VFTConceptOverview
            updateFormField={this.updateFormField}
            selectOption={this.selectOption}
            conceptName="Hardcoded Name"
            conceptRank={this.state.conceptRank}
            VFComments={this.state.VFComments}
          />
        </div>
        <div className="finance-report-section-container">
          <FormSectionHeader
            title="Concept Rankings"
          />
          <VFTConceptScores
            selectOption={this.selectOption}
            solutionScore={this.state.solutionScore}
            businessModelScore={this.state.businessModelScore}
            marketSizeScore={this.state.marketSizeScore}
            corpAdvantageScore={this.state.corpAdvantageScore}
          />
        </div>
        <div className="create-innovation-user-actions">
          <BackTextLink
            label="Back"
            onClick={() => this.props.history.goBack()}
          />
          <ButtonSubmit
            label="Save"
            onClick={() => this.createConceptFinanceReport()}
          />
        </div>
      </div>
    )
  }
}

ConceptFinanceReport.propTypes = {
  history: PropTypes.object
};

export default ConceptFinanceReport;
