import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InnovationKeyDate from './InnovationKeyDate';
import AddNewKeyDateForm from './AddNewKeyDateForm';
import ButtonSubmit from '../../buttons/ButtonSubmit';
import ButtonCancel from '../../buttons/ButtonCancel';

import '../../../styles/css/innovation-add-dates.css'

import { editKeyDates } from '../../../actions/innovations';
import { requiredKeyDates } from '../../../config/innovationOptions';

class InnovationAddDates extends Component {
  state = {
    innovationKeyDates: [],
    openNewKeyDateForm: false
  }

  // TODO: See if this would be better in static getDerivedStateFromProps.
  componentDidMount = () => {
    const { keyDates } = this.props;
    // The date picker component requires dates as moment objects. The fromDB flag determines whether to edit or create when POSTing to the API.
    const datesFromDB = keyDates ? keyDates.map(keyDate => ({ ...keyDate, date: keyDate.date, fromDB: true }) ) : [];
    const dateNamesInDB = datesFromDB.map(keyDate => keyDate.name);
    // Check keyDates from redux for the rquired dates, add any that are missing to the front of the array.
    const missingKeyDates = requiredKeyDates.filter(requiredKeyDate => !dateNamesInDB.includes(requiredKeyDate))
    const missingKeyDateObjects = missingKeyDates.map(missingKeyDate => ({ id: missingKeyDate, name: missingKeyDate, date: null }));
    const requiredAndCustomDates = [ ...missingKeyDateObjects, ...datesFromDB ];
    this.setState({ innovationKeyDates: requiredAndCustomDates })
  }

  createNewKeyDate = (id, name, date) => {
    const { innovationKeyDates } = this.state;
    this.setState({ innovationKeyDates:  [ ...innovationKeyDates, { id, name, date: date.format('YYYY-MM-DD') } ] })
  }

  editKeyDate = (keyDateId, key, value) => {
    const { innovationKeyDates } = this.state;
    const keyDatesCopy = [ ...innovationKeyDates ];
    const indexToUpdate = keyDatesCopy.findIndex(keyDate => keyDate.id === keyDateId);
    if (indexToUpdate > -1) {
      keyDatesCopy[indexToUpdate][key] = value;
      keyDatesCopy[indexToUpdate]['hasChanged'] = true;
      this.setState({ innovationKeyDates: keyDatesCopy })
    }
  }

  // Add an attribute 'toDelete' to the keydate. This causes it not to display and to run .destroy() in the editKeyDates action
  deleteKeyDate = (keyDateId) => {
    const { innovationKeyDates } = this.state;
    const keyDatesCopy = [ ...innovationKeyDates ];
    const indexToUpdate = keyDatesCopy.findIndex(keyDate => keyDate.id === keyDateId);
    if (indexToUpdate > -1) {
      keyDatesCopy[indexToUpdate]['forDeletion'] = true;
      this.setState({ innovationKeyDates: keyDatesCopy })
    }
  }

  // Function that calls action -> the API.
  updateKeyDates = () => {
    const { editKeyDates, innovationId, callback } = this.props;
    const { innovationKeyDates } = this.state;
    const updatedKeyDates = innovationKeyDates.filter(keyDate => keyDate.date);
    editKeyDates(innovationId, updatedKeyDates);
    callback();
  }

  toggleFormOpen = () => {
    this.setState({ openNewKeyDateForm: !this.state.openNewKeyDateForm })
  }

  render() {
    const { openNewKeyDateForm, innovationKeyDates } = this.state;
    const { innovationOpenDate } = this.props;

    let allEntered = true;

    innovationKeyDates.forEach(date => {
      if(date.date === null) {
        allEntered = false;
      }
    });

    return (
      <div>
        <div className="innovation-keydates-container">
          <div className="innovation-keydates">
            {
              innovationKeyDates
                .filter(keyDate => !keyDate.forDeletion)
                .map(({ id, name, date }) => (
                  <InnovationKeyDate
                    key={id}
                    id={id}
                    name={name}
                    date={date}
                    required={requiredKeyDates.includes(name)}
                    editKeyDate={this.editKeyDate}
                    deleteKeyDate={this.deleteKeyDate}
                    innovationOpenDate={innovationOpenDate}
                  />
                ))
            }
          </div>
        </div>
        {
          openNewKeyDateForm
            ? (
              <div className="innovation-add-keydate-form">
                <AddNewKeyDateForm
                  createNewKeyDate={this.createNewKeyDate}
                  toggleFormOpen={() => this.setState({ openNewKeyDateForm: false })}
                  newId={innovationKeyDates.length + 1}
                  toggleForm={this.toggleForm}
                />
              </div>
            )
            : (
              <div onClick={() => this.setState({ openNewKeyDateForm: true })} className="innovation-add-keydate">
                <div className="innovation-add-keydate-icon-container">
                  <i className="fa fa-plus add-new-keydate-icon"></i>
              </div>
                <div className="innovation-add-keydate-text">Add additional custom dates</div>
              </div>
            )
        }
        <div className="create-innovation-user-actions">
          <ButtonSubmit
            disabled={!allEntered}
            label="Save"
            onClick={() => this.updateKeyDates()} // TODO. Conditional on which module is open.
          />

          <ButtonCancel
            onClick={this.props.callback}
          />
        </div>
      </div>
    )
  }
}

InnovationAddDates.propTypes = {
  innovationId: PropTypes.string,
  editKeyDates: PropTypes.func,
  callback: PropTypes.func,
  keyDates: PropTypes.array,
  innovationOpenDate: PropTypes.string
}

const mapStateToProps = state => ({
  keyDates: state.innovations.activeInnovation.keyDates,
})

// TODO: Not implemented yet in user actions.
// const actions = { inviteTeamMembers };
const actions = { editKeyDates };

export default connect(mapStateToProps, actions)(InnovationAddDates);
