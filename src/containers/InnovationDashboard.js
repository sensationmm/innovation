import React from 'react';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';  

import '../styles/css/innovation-dashboard.css';

const InnovationDashboard = () => (
  <div>
    <h1>I am the dashboard for all the innovations</h1>
    <Link to='/create-innovation'>Create a new Innovation</Link>
    {/* {
      innovations.map(innovation => {
        const { }
      })
    } */}
    <div>Innovation 1</div>
    <div>Innovation 2</div>
    <div>Innovation 3</div>
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
