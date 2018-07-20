import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import ContentBox from '../components/layout/ContentBox';
import FormSectionHeader from '../components/layout/FormSectionHeader';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/innovation-dashboard.css';

const dummyUsers = ['partner1@fake.com', 'partner2@fake.com', 'partner3@fake.com', 'partner4@fake.com', 'partner5@fake.com']
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
    const { sendSummaryOpen, emails } = this.state;
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
                <InnovationAddTeam
                  newTeamMembers={emails}
                  curTeamMembers={[]}
                  addNewTeamMember={this.addEmail}
                  removeNewTeamMember={this.removeEmail}
                  allVentureViewUsers={dummyUsers}
                />
                <div className="send-summary-popup-user-actions">
                  <BackTextLink
                    label="Cancel"
                    onClick={() => this.toggleOpenSendSummary()}
                  />
                  <ButtonSubmit
                    label="Send"
                    onClick={() => this.sendInnovationsSummmary()}
                  />
                </div>
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
            (userType === 'teamGM' || userType === 'teamMember') &&
              <div className="innovation-dash-send-summary-container" onClick={() => this.toggleOpenSendSummary()}>
                <div><i className="fas fa-envelope fa-2x send-summary-icon"></i></div>
                <div>Send Summary Innovations</div>
              </div>
          }
        </div>
        {
          innovations.map(innovation => {
            return (
              <ContentBox key={`dashboard-${innovation.sprintName}`}>
                <div className="innovation-dash-innovation-container">
                  <div className="innovation-dash-summary">
                    <div className="innovation-dash-text-field">
                      {innovation.sprintName}
                    </div>
                    <div className="innovation-dash-text-field">
                      {innovation.partner}
                    </div>
                    <div className="innovation-dash-text-field subtitle">
                      {innovation.chargeCode}
                    </div>
                    <div className="innovation-dash-text-field">
                      <div className="innovation-dash-key-dates">
                        {innovation.keyDates.map(keyDate => (
                          <div key={`keyDates-${keyDate.name}`}>{keyDate.name}: {keyDate.date}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link to={`/innovation-overview/${innovation.id}`}>
                    <div className="innovation-dash-view-details-link">View Details</div>
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
 // TODO
};


const mapStateToProps = state => ({
  innovations: state.innovations.allInnovationsList
});

// const mapDispatchToProps = dispatch => ({
//   createInnovation: bindActionCreators(createInnovation, dispatch)
// });

export default connect(mapStateToProps, null)(InnovationDashboard)
