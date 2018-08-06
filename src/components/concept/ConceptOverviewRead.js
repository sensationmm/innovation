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
  const { activeConcept, conceptAnalysis, targetIndustry } = props;
  const targetIndustryName = targetIndustry && targetIndustry.name;
  return (
    <div>
      <div>Concept Status (Testing): {activeConcept.status}</div>
      <div className="concept-overview-page-header">
        <div className="concept-overview-page-title">Concept Overview: {activeConcept.name}</div>
        {
          (activeConcept.status === 'ready' || activeConcept.status === 'analysed') &&
            <div className="concept-overview-page-edit-report-btn">
              <Link
                to={`/vft-concept-report/${activeConcept.id}`}>{activeConcept.status === 'ready' ? 'Complete Analysis Report' : 'Edit Analysis Report'}
              </Link>
            </div>
        }
      </div>

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
                  content: item.value === 'targetIndustry' ? targetIndustryName : activeConcept[item.value]
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
  conceptAnalysis: state.financeScores.scoresByConceptId[props.activeConcept.id],
  targetIndustry: state.resources.targetIndustries.find(targetIndustry => targetIndustry.id === props.activeConcept.targetIndustryId)
})

export default connect(mapStateToProps, null)(ConceptOverviewRead);
