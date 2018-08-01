import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import ContentBox from '../components/layout/ContentBox';
import FormSectionHeader from '../components/formInputs/FormSectionHeader';

import '../styles/css/innovation-dashboard.css';

const userType = 'teamGM'; // get user type from auth.user in redux store.

class InnovationDashboard extends Component {
  state = {
    sendSummaryOpen: false,
    emails: []
  }

  addEmail = (emailToAdd) => {
    this.setState({ emails: this.state.emails.concat(emailToAdd) });
  }

  removeEmail = (emailToRemove) => {
    this.setState({ emails: this.state.emails.filter(email => email !== emailToRemove)});
  }

  toggleOpenSendSummary = () => {
    this.setState({
      sendSummaryOpen: !this.state.sendSummaryOpen,
      emails: []
     })
  }

  sendInnovationsSummmary = () => {
    console.log('Send innovations summary to ', this.state.emails);
  }

  render() {
    const { innovations } = this.props;
    const { sendSummaryOpen } = this.state;
    return (
      <div>
        {
          sendSummaryOpen &&
            <div className="innovation-dash-send-summary-modal-mask">
              <div className="innovation-dash-send-summary-popup">
                <FormSectionHeader
                  title="Send A Summary of All Innovations"
                  subtitle="Enter emails to send summary of current innovations (you'll automatically recieve a copy of the email)."
                />
                <InnovationAddTeam onSave={() => this.sendInnovationsSummmary()} onCancel={this.toggleOpenSendSummary} />
              </div>
            </div>
        }
        <div className="innovation-dash-header">
          <div>DV Location / Team Name</div>
          <div>Your Innovations</div>
        </div>
        <div className="innovation-dash-toplinks">
          <Link className="innovation-dash-add-innovation-link" to='/create-innovation'>
            <div><i className="fas fa-plus fa-2x add-innovation-icon"></i></div>
            <div>Create a new Innovation</div>
          </Link>
          {
            (innovations.length > 0 && (userType === 'teamGM' || userType === 'teamMember')) &&
              <div className="innovation-dash-send-summary-container" onClick={() => this.toggleOpenSendSummary()}>
                <div><i className="fas fa-envelope fa-2x send-summary-icon"></i></div>
                <div>Send Innovations Summary</div>
              </div>
          }
        </div>
        {
          innovations && innovations.map(innovation => {
            return (
              <ContentBox key={`dashboard-${innovation.innovationId}`}>
                <div className="innovation-dash-innovation-container">
                  <div className="innovation-dash-summary">
                    <div className="innovation-dash-text-field">
                      {innovation.sprintName}
                    </div>
                    <div className="innovation-dash-text-field">
                      {innovation.partnerName}
                    </div>
                    <div className="innovation-dash-text-field subtitle">
                      {innovation.chargeCode}
                    </div>
                    <div className="innovation-dash-text-field">
                      <div className="innovation-dash-key-dates">
                        {
                          (innovation.keyDates && innovation.keyDates.length > 0)
                            ? innovation.keyDates.map(keyDate => (
                                <div key={`keyDates-${keyDate.name}`}>{keyDate.name}: {keyDate.date}</div>
                              ))
                            : <div>Key Dates Not Yet Added - Add key dates button?</div>
                          }
                      </div>
                    </div>
                  </div>
                  <Link className="innovation-dash-view-details-link" to={`/innovation-overview/${innovation.partnerId}`}>
                    View Details
                  </Link>
                </div>
              </ContentBox>
            )
          })
        }
      </div>
    )
  }
}

InnovationDashboard.propTypes = {
   innovations: PropTypes.array,
   getActiveInnovationData: PropTypes.func
};

const mapStateToProps = state => ({
  innovations: state.innovations.allInnovationsList.filter(innovation => innovation.chargeCode) // TODO: remove once DB is cleared of test data.
});

export default connect(mapStateToProps, null)(InnovationDashboard)
