import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FinanceReportInput from '../components/formInputs/FinanceReportInput';
import FormSectionHeader from '../components/formInputs/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/concept-finance-report.css'

class ConceptFinanceReport extends Component {
  state = {
    pvf: { value: null, description: '', comment: '' } // key, value, description, comment are required to save a FinanceScore.
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  selectOption = (key, value) => {
    this.setState({ [key]: value })
  }

  createConceptFinanceReport = () => {
    const { match: { params: { conceptId } } } = this.props;
    console.log('create finance report on concept', conceptId);
    console.log('create finance report with', this.state);
  }

  render() {
    return (
      <div className="finance-report-container">
        <div className="finance-report-page-title">Concept Finance Report</div>
        <div className="finance-report-section-container">
          <FinanceReportInput
            keyToUpdate="pvf"
            title="PVF"
            optionSet={[{number: 0, label: '<0.85'}, {number: 1, label: '0.85-1.00'}, {number: 2, label: '1.00+'}]}
            selectedValue={this.state.pvf}
            selectOption={this.selectOption}
            isRequired={true}
          />
          {/* <FormSectionHeader
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
        </div> */}
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
  history: PropTypes.object,
  match: PropTypes.object
};

export default ConceptFinanceReport;
