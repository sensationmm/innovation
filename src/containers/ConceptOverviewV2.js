import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConceptOverviewEditable from '../components/concept/ConceptOverviewEditable';
import ConceptOverviewRead from '../components/concept/ConceptOverviewRead';

import { getActiveInnovationData } from '../actions/innovations';

class ConceptOverviewV2 extends Component {
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
      history.push('/page-not-found');
    }
  }

  render() {
    const { activeConcept } = this.props;
    if (!activeConcept) { return null }
    const { activeInnovationId, activePartnerId, conceptsById, userType } = this.props;
    return (
      <div>
        <Link to={`/innovation-overview/${activePartnerId}`}>
          <span>
            <i className="fas fa-chevron-left"></i>
            <span> Back to Innovation Overview</span>
          </span>
        </Link>
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
  userType: PropTypes.string,
  getActiveInnovationData: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  activeInnovationId: state.innovations.activeInnovation.id,
  activePartnerId: state.partners.activePartner.id,
  conceptsById: state.concepts.conceptsById,
  activeConcept: (state.concepts.conceptsById && state.concepts.conceptsById[props.match.params.conceptId]) || null,
  userType: state.auth.authedUser.roleName
});

const actions = { getActiveInnovationData };

export default connect(mapStateToProps, actions)(ConceptOverviewV2)
