import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import ContentBox from '../components/layout/ContentBox';

import '../styles/css/schedule.css';

class Schedule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {

    return (
      <div className="tracking">
        <ContentBox background={false}>
          hello
        </ContentBox>
      </div>
    );
  }
}

Schedule.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(Schedule);
