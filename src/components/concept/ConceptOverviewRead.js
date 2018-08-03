import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import ConceptAnalysis from './ConceptAnalysis';
import ContentBox from '../layout/ContentBox';
import ConceptMeta from './ConceptMeta.js';

import { conceptFieldGroups } from '../../config/conceptOptions';

import '../../styles/css/concept-overview-read.css';

const ConceptOverviewRead = (props) => {
  const { activeConcept, conceptAnalysis } = props;
  return (
    <div>
      <div>Name: {activeConcept.name}</div>
      <div>Status: {activeConcept.status}</div>
      {
        activeConcept.status === 'ready' &&
          <Link to={`/vft-concept-report/${activeConcept.id}`}>Complete Analysis Form</Link>
      }
      {
        activeConcept.status === 'analysed' &&
          <ConceptAnalysis conceptAnalysis={conceptAnalysis} />
      }
      <ContentBox border padded>
        {
          conceptFieldGroups.map(fieldGroup => (
            <ConceptMeta
              key={`concept-info-${fieldGroup.key}`}
              label={fieldGroup.displayAs}
              stats={fieldGroup.contents.map(item => ({
                  label: item.label,
                  content: activeConcept[item.value]
                }
              ))}
            />
          ))
        }
      </ContentBox>
    </div>
  )
}

ConceptOverviewRead.propTypes = {
  history: PropTypes.object,
  activeConcept: PropTypes.object,
  conceptAnalysis: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  financeAnalysis: state.financeScores.financeScoresByConceptId[props.activeConcept.id]
})

export default ConceptOverviewRead;
