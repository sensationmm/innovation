import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InnovationAddDetails from '../components/innovation/InnovationAddDetails';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationAddDates from '../components/innovation/InnovationAddDates';
import InnovationAddAreas from '../components/innovation/InnovationAddAreas';

import { createInnovation } from '../actions/innovations';

class InnovationCreate extends Component {
  state = {
    step: 1,
    innovationName: '',
    innovationLogo: '',
    teamMembers: [],
    keyDates: [],
    opportunityAreas: []
  }

  updateDetails = (key, value) => {
    this.setState({ [key]: value })
  }

  submitNewInnovation = () => {
    console.log('Call create a new innovation action');
  }

  render() {
    const { step, innovationName, innovationLogo, teamMembers, keyDates, opportunityAreas } = this.state;
    return (
      <div>
        <h1>Create Innovation</h1>
        <div style={{display: 'flex'}}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div>
          {
            step === 1 &&
              <InnovationAddDetails
                innovationName={innovationName}
                updateInnovationName={this.updateDetails}
                innovationLogo={innovationLogo}
                updateInnovationLogo={this.updateDetails}
              />
          }
          {
            step === 2 &&
              <InnovationAddTeam></InnovationAddTeam>
          }
          {
            step === 3 &&
              <InnovationAddDates></InnovationAddDates>
          }
          {
            step === 4 &&
              <InnovationAddAreas></InnovationAddAreas>
          }
          {
            step === 4
              ? <button onClick={this.submitNewInnovation}>Complete</button>
              : <button onClick={() => this.setState({ step: step + 1})}>Next Step</button>
          }
        </div>
      </div>
    )
  }
}

// CreateInnovation.propTypes = {
//  // TODO
// };
//
// const mapStateToProps = state => ({
//   // TODO
// });
//
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createInnovation
  }, dispatch
);

export default connect(mapDispatchToProps, null)(InnovationCreate);
