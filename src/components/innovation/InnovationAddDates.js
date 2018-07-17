import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InnovationKeyDate from './InnovationKeyDate';
import AddNewKeyDateForm from './AddNewKeyDateForm';

import '../../styles/css/innovation-add-dates.css';

class InnovationAddDates extends Component {
  state = {
    openNewKeyDateForm: false
  }

  toggleFormOpen = () => {
    this.setState({ openNewKeyDateForm: !this.state.openNewKeyDateForm })
  }

  render() {
    const { innovationKeyDates, deleteKeyDate, editKeyDate, createNewKeyDate } = this.props;
    const { openNewKeyDateForm } = this.state;
    return (
      <div>
        <div className="innovation-add-dates-header">
          <div className="innovation-add-dates-header-title">Enter Immersion Session Key Dates</div>
          <div className="innovation-add-dates-header-subtitle">These are required to create your innovation timeline, you can edit these later if you need to</div>
        </div>
        <div className="innovation-keydates-container">
          <div className="innovation-keydates">
            {
              innovationKeyDates.map(({ id, name, date, type }) => (
                                          <InnovationKeyDate
                                            key={id}
                                            id={id}
                                            name={name}
                                            date={date}
                                            type={type}
                                            editKeyDate={editKeyDate}
                                            deleteKeyDate={deleteKeyDate}
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
                  createNewKeyDate={createNewKeyDate}
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
      </div>
    )
  }
}

InnovationAddDates.propTypes = {
  id: PropTypes.number,
  innovationKeyDates: PropTypes.array,
  deleteKeyDate: PropTypes.func,
  editKeyDate: PropTypes.func,
  createNewKeyDate: PropTypes.func
}

export default InnovationAddDates;
