import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  // // TODO: Populate state from 'financeScoreOptions'.
  // componentDidMount = () => {
  //   const { conceptFinanceReport } = this.props;
  //   // Create state object from the config file financeScoreOptions.
  //   const derivedState = {};
  //   financeScoreOptions.forEach(option => {
  //     derivedState[option.key] = {
  //       value: null,
  //       description: '',
  //       comment: ''
  //     }
  //   }
  //   // Then, if it exists, populate it with data from redux: concept > financeReport
  // }

  componentDidMount = () => {
    const { conceptFinanceReport } = this.props;
    const derivedState = {};
    // TODO: if conceptFinanceReport then fill the following object with values from it.
    // TODO: Then use state to control the form inputs
    // TODO: Then use state to submit the form.
    financeScoreOptions.forEach(option => {
      derivedState[option.key] = {
        value: null,
        description: '',
        comment: ''
      }
    })
    this.setState({ ...derivedState });
  }

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
    console.log('state', this.state);
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
                attrName={option.key}
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
  match: PropTypes.object,
  conceptFinanceReport: PropTypes.objects
};

const mapStateToProps = (state, props) => ({
  conceptFinanceReport: (state.concepts.conceptsById && state.concepts.conceptsById[props.match.params.conceptId].financeReport) || null
});

const actions = {};

export default connect(mapStateToProps, actions)(ConceptFinanceReport);
