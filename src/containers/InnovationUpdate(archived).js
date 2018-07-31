import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormSectionHeader from '../components/formInputs/FormSectionHeader';
import FormTextArea from '../components/formInputs/FormTextArea';
import ButtonSubmit from '../components/buttons/ButtonSubmit';

import '../styles/css/innovation-create.css';

import { editInnovation } from '../actions/innovations';

class InnovationUpdate extends Component {
  state = {
    innovationKeyDates: [],
    newTeamMembers: [],
    innovationMandate: ''
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  // TODO.
  // updateTeamMembers = () => {
  //   const { editInnovation, innovationId } = this.props;
  //
  //   inviteTeamMembers(innovationId, attrsToUpdate)
  // }

  // updateMandate = () => {
  //   const { editInnovation, innovationId } = this.props;
  //
  //   editInnovation(innovationId, attrsToUpdate)
  // }

  render() {
    const { openEditMandate } = this.props;
    console.log(this.state);
    return (
      <div className="create-innovation-container">
        {
          openEditMandate &&
            <div className="create-innovation-section-container">
              <FormSectionHeader
                title="Innovation Mandate"
                subtitle="What is the focus? Who is the champion? CEO or middle management?"
              />
              <FormTextArea
                id="innovationMandate"
                placeholder="What is your innovation mandate?"
                onChange={this.updateFormField}
                value={this.state.innovationMandate}
              />
            </div>
        }

        <div className="create-innovation-user-actions">
          <ButtonSubmit
            label="Save"
            onClick={() => this.updateKeyDates()} // TODO. Conditional on which module is open.
          />
        </div>
      </div>
    )
  }
}

InnovationUpdate.propTypes = {
  history: PropTypes.object,
  editInnovation: PropTypes.func,
  openEditMandate: PropTypes.bool,
  innovationId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const mapStateToProps = state => ({
  mandate: state.innovations.activeInnovation.mandate
});

const actions = { editInnovation };

export default connect(mapStateToProps, actions)(InnovationUpdate);
