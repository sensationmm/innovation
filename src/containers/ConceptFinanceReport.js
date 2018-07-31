import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FinanceReportInput from '../components/formInputs/FinanceReportInput';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import { financeScoreOptions } from '../config/conceptOptions';

import '../styles/css/concept-finance-report.css'

class ConceptFinanceReport extends Component {
  state = {
    pvf: { value: null, description: '', comment: '' } // key, value, description, comment are required to save a FinanceScore.
  }

  stat

  updateOption = (key, index, label) => {
    const newKeyObj = { ...this.state[key], description: label, value: index };
    this.setState({ [key]: newKeyObj });
  }

  updateComment = (key, comment) => {
    const newKeyObj = { ...this.state[key], comment };
    this.setState({ [key]: newKeyObj });
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
          {
            financeScoreOptions.map(option => (
              <FinanceReportInput
                key={`finance-report-input-${option.key}`}
                keyToUpdate={option.key}
                title={option.title}
                labels={option.labels}
                selectedAttr={this.state[option.key]}
                updateOption={this.updateOption}
                updateComment={this.updateComment}
                isRequired={true}
              />
            ))
          }

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
    </div>
    )
  }
}

ConceptFinanceReport.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default ConceptFinanceReport;
