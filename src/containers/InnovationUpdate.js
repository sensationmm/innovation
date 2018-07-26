import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import InnovationAddDates from '../components/innovation/keydates/InnovationAddDates';
import InnovationAddTeam from '../components/innovation/InnovationAddTeam';
import InnovationTeam from '../components/innovation/InnovationTeam';
import FormSectionHeader from '../components/formInputs/FormSectionHeader';
import FormTextArea from '../components/formInputs/FormTextArea';
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import BackTextLink from '../components/buttons/BackTextLink';

import '../styles/css/innovation-create.css';

import { editInnovation, editKeyDates } from '../actions/innovations';
import { keyDatesOptions } from '../config/innovationOptions';
import { removeNullValueAttrs } from '../utils/functions';

import { requiredKeyDates } from  '../config/innovationOptions';

const curTeamMembers = [
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Warren', position: 'DV Partner'}, {name: 'Aileen', position: 'DV Partner'},
  {name: 'Stavros', position: 'GM'}, {name: 'Barry', position: 'VA'},
  {name: 'Clem', position: 'SD'}, {name: 'Geraldine', position: 'Engineer'}
];
const allUsers = [ 'dv1Personx', 'dv2Persony', 'dv3Personz', 'dv2Personx', 'dv3Personx', 'dv4Person', 'dv5Person', 'dv6Person' ];

class InnovationUpdate extends Component {
  state = {
    innovationKeyDates: [],
    newTeamMembers: [],
    innovationMandate: ''
  }

  componentDidMount = (props) => {
    console.log('componentDidMount', this.props);
    const { keyDates } = this.props;
    // The date picker component requires dates as moment objects. The fromDB flag determines whether to edit or create when POSTing to the API.
    const datesFromDB = keyDates ? keyDates.map(keyDate => ({ ...keyDate, date: moment(keyDate.date), fromDB: true }) ) : [];
    const dateNamesInDB = datesFromDB.map(keyDate => keyDate.name);
    console.log('keyDateNames', dateNamesInDB);
    // Check keyDates from redux for the rquired dates, add any that are missing to the front of the array.
    const missingKeyDates = requiredKeyDates.filter(requiredKeyDate => !dateNamesInDB.includes(requiredKeyDate))
    console.log('missingKeyDates', missingKeyDates);
    const missingKeyDateObjects = missingKeyDates.map(missingKeyDate => ({ id: missingKeyDate, name: missingKeyDate, date: null }));
    console.log('missingKeyDateObjects', missingKeyDateObjects);
    console.log('savedKeyDates', datesFromDB);
    const requiredAndCustomDates = [ ...missingKeyDateObjects, ...datesFromDB ];
    console.log('keyDatesOptions', requiredAndCustomDates);
    this.setState({ innovationKeyDates: requiredAndCustomDates })
  }

  createNewKeyDate = (id, name, date) => {
    const { innovationKeyDates } = this.state;
    this.setState({ innovationKeyDates:  [ ...innovationKeyDates, { id, name, date } ] })
  }

  editKeyDate = (keyDateId, key, value) => {
    const { innovationKeyDates } = this.state;
    const keyDatesCopy = [ ...innovationKeyDates ];
    const indexToUpdate = keyDatesCopy.findIndex(keyDate => keyDate.id === keyDateId);
    if (indexToUpdate > -1) {
      keyDatesCopy[indexToUpdate][key] = value;
      this.setState({ innovationKeyDates: keyDatesCopy })
    }
  }

  deleteKeyDate = (keyDateId) => {
    const { innovationKeyDates } = this.state;
    const newKeyDates = innovationKeyDates.filter(keyDate => keyDate.id !== keyDateId);
    this.setState({ innovationKeyDates: newKeyDates })
  }

  addNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: [ ...newTeamMembers, email ] })
  }

  removeNewTeamMember = (email) => {
    const { newTeamMembers } = this.state;
    this.setState({ newTeamMembers: newTeamMembers.filter(teamMember => teamMember !== email) })
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  // Functions that call actions -> the API.
  updateKeyDates = () => {
    const { editKeyDates, innovationId } = this.props;
    const { innovationKeyDates } = this.state;
    const updatedKeyDates = innovationKeyDates.filter(keyDate => keyDate.date);
    editKeyDates(innovationId, updatedKeyDates);
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
    const { openEditDates, openEditTeam, openEditMandate } = this.props;
    return (
      <div className="create-innovation-container">
        {
          openEditDates &&
            <div className="create-innovation-section-container">
              <FormSectionHeader
                title='Enter Immersion Session Key Dates'
                subtitle='These are required to create your innovation timeline, you can edit these later if you need to'
              />
              <InnovationAddDates
                innovationKeyDates={this.state.innovationKeyDates}
                createNewKeyDate={this.createNewKeyDate}
                editKeyDate={this.editKeyDate}
                deleteKeyDate={this.deleteKeyDate}
                requiredKeyDates={requiredKeyDates}
              />
            </div>
        }
        {
          openEditTeam &&
            <div>
              <div className="create-innovation-section-container">
                <FormSectionHeader
                  title='Your Current Team'
                />
                <InnovationTeam
                  teamMembers={curTeamMembers}
                />
              </div>

              <div className="create-innovation-section-container">
                <FormSectionHeader
                  title="Add New Team Members"
                  subtitle="Invites will be sent to new team members when you save"
                />
                <InnovationAddTeam
                  addNewTeamMember={this.addNewTeamMember}
                  removeNewTeamMember={this.removeNewTeamMember}
                  curTeamMembers={curTeamMembers}
                  newTeamMembers={this.state.newTeamMembers}
                  allVentureViewUsers={allUsers}
                />
              </div>
            </div>
        }
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
  editKeyDates: PropTypes.func,
  openEditDates: PropTypes.bool,
  openEditTeam: PropTypes.bool,
  openEditMandate: PropTypes.bool,
  innovationId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const mapStateToProps = state => ({
  keyDates: state.innovations.activeInnovation.keyDates,
  teamMembers: state.innovations.activeInnovation.teamMembers,
  mandate: state.innovations.activeInnovation.mandate
});

const actions = { editInnovation, editKeyDates };

export default connect(mapStateToProps, actions)(InnovationUpdate);
