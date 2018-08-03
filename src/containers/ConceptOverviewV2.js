import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptOverviewEditable from '../components/concept/ConceptOverviewEditable';
import ConceptOverviewRead from '../components/concept/ConceptOverviewRead';

import { getActiveInnovationData } from '../actions/innovations';

class ConceptOverviewV2 extends Component {
  state = {
    userType: 'finance' // TODO: For testing only
  }

  componentDidMount() {
    this.checkConceptInnovation();
  }

  componentDidUpdate() {
    this.checkConceptInnovation();
  }

  checkConceptInnovation = () => {
    const { activeConcept, conceptsById, getActiveInnovationData, history } = this.props;

    if(!conceptsById || (Object.keys(conceptsById).length === 0 && conceptsById.constructor === Object)) {
      const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
      getActiveInnovationData(storedToken.activePartnerId);
    } else if(!activeConcept) {
      history.push('/dashboard');
    }
  }

  render() {
    const { activeConcept } = this.props;
    if (!activeConcept) { return null };
    const { activeInnovationId, activePartnerId, conceptsById, authedUser } = this.props;
    const { userType } = this.state; // TODO: For testing only
    return (
      <div>
        {/* <div>{authedUser.roleName}</div> */}
        <div onClick={() => this.setState({ userType: userType === 'finance' ? 'member' : 'finance' })}>Change User Type</div>
        <div>User Type: {userType}</div>
        {
          userType === 'finance'
            ? (
              <ConceptOverviewRead
                activeConcept={activeConcept}
              />
            )
            : (
              <ConceptOverviewEditable
                activeInnovationId={activeInnovationId}
                activePartnerId={activePartnerId}
                conceptsById={conceptsById}
                activeConcept={activeConcept}
              />
            )
        }
      </div>
    )
  }
}

ConceptOverviewV2.propTypes = {
  history: PropTypes.object,
  activeInnovationId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  activePartnerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  conceptsById: PropTypes.object,
  activeConcept: PropTypes.object,
  authedUser: PropTypes.object,
  getActiveInnovationData: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activePartnerId: state.partners.activePartner.id,
  conceptsById: state.concepts.conceptsById,
  activeConcept: (state.concepts.conceptsById && state.concepts.conceptsById[props.match.params.conceptId]) || null,
  authedUser: state.auth.authedUser
});

const actions = { getActiveInnovationData };

export default connect(mapStateToProps, actions)(ConceptOverviewV2)
