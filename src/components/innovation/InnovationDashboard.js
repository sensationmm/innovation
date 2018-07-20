import React from 'react';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import ContentBox from '../layout/ContentBox';

import '../../styles/css/innovation-dashboard.css';

const InnovationDashboard = (props) => (
  <div>
    <div className="innovation-dash-header">
      <div>Your Innovations</div>
    </div>

    <Link className="innovation-dash-add-innovation-link" to='/create-innovation'>
      <div className="innovation-dash-add-innovation-container">
        <div><i className="fas fa-plus fa-3x add-innovation-icon"></i></div>
        <div>Create a new Innovation</div>
      </div>
    </Link>
    {
      props.innovations.map(innovation => {
        return (
          <ContentBox key={`dashboard-${innovation.sprintName}`}>
            <div className="innovation-dash-innovation-container">
              <div>
                <div className="innovation-dash-text-field">
                  {innovation.sprintName}
                </div>
                <div className="innovation-dash-text-field">
                  {innovation.partner}
                </div>
                <div className="innovation-dash-text-field">
                  {innovation.chargeCode}
                </div>
                <div className="innovation-dash-text-field">
                  {innovation.keyDates.map(keyDate => (
                    <span key={`keyDates-${keyDate.name}`}>{keyDate.name}: {keyDate.date}, </span>
                  ))}
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
