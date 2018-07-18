import React, { Component } from 'react';

import ConceptReportOverview from '../components/concept/ConceptReportOverview';
import ConceptReportRanking from '../components/concept/ConceptReportRanking';
import FormSectionHeader from '../components/layout/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';

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
    console.log('create finance report with', this.state);
  }

  render() {
    const backButton = (
      <div className="step-back-link">
        <i className="fas fa-chevron-left"></i>
        <span className="step-back-link-text"
          onClick={() => this.props.history.goBack()}
        >Back</span>
      </div>
    );
    return (
      <div className="finance-report-container">
        <div className="finance-report-page-title">Concept Finance Report</div>
        <div className="finance-report-section-container">
          <FormSectionHeader
            title="Concept Overview"
          />
          <ConceptReportOverview
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
          <ConceptReportRanking
            selectOption={this.selectOption}
            solutionScore={this.state.solutionScore}
            businessModelScore={this.state.businessModelScore}
            marketSizeScore={this.state.marketSizeScore}
            corpAdvantageScore={this.state.corpAdvantageScore}
          />
        </div>
        <div className="create-innovation-user-actions">
          {backButton}
          {
            true
              ? <ButtonSubmit label="Save" onClick={this.createConceptFinanceReport} />
              : <ButtonSubmit disabled={true} label="Enter Required Details" />
          }
        </div>
      </div>
    )
  }
}

export default ConceptFinanceReport;
