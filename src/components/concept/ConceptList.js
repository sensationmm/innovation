import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import ConceptAvatar from './ConceptAvatar';
import KillButton from '../buttons/KillButton';
import CompleteButton from '../buttons/CompleteButton';

import { editConcept } from '../../actions/concepts';

import '../../styles/css/concept-list.css';

/**
 * ConceptList
 *
 * Renders a list of concepts in a portfolio
 *
 * @param {array} concepts - array of concept objects to display.
 * @param {string} title - title for the concepts list header
 * @param {bool} postIS2 - is the innovation now past IS2? Causes some functionality changes.
 * @param {string} userType - user type will determine some functionality - may be better to get directly from redux store > auth > user
 */

const ConceptList = props => {
  const { postIS2, userType, concepts, editConcept } = props;
  return (
    <div className="concept-list">
      <div className="concept-list-header">{props.title}</div>
      <div>For testing: {userType}</div>
      <div>For testing: {postIS2 ? 'Post IS2' : 'Pre IS2'}</div>
      <div className="concept-list-items">
      {
        concepts && concepts.map(concept => {
          const {
            id,
            name,
            logo,
            ident,
            color,
            description,
            status
          } = concept;
          return (
            <div className="concept-list-item" key={`concept-${id}`}>
              <Link className="concept-list-item-link" to={`/concept/${id}`}>
                <div className="concept-list-item-details">
                  <ConceptAvatar conceptId={id} ident={ident || 'TD'} color={color || 'blue'} logo={logo && logo.preview} showLink={false}/>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <div>For testing: {status}</div>
                </div>
              </Link>
              {
                (!postIS2 && userType === 'teamGM') &&
                  <div className="concept-list-item-user-actions">
                    {
                      (status === 'draft' || status ==='ready')
                        ? <KillButton label='Kill' onClick={() => editConcept(id, { status: 'killed' }, true)} />
                        : <CompleteButton label='Re-Activate' onClick={() => editConcept(id, { status: 'draft' }, true)} />
                    }
                  </div>
              }
              {
                (postIS2 && userType === 'teamGM') &&
                  <div>
                    {
                      (status === 'ready') &&
                        <div className="concept-list-item-user-actions">
                          <div className="concept-list-item-marked-complete"><i className="far fa-clock"></i>Awaiting VFT Analysis</div>
                        </div>
                    }
                    {
                      (status === 'draft') &&
                        <div className="concept-list-item-user-actions">
                          <CompleteButton label='Mark as Ready' onClick={() => editConcept(id, { status: 'ready' }, true)} />
                          <KillButton label='Kill' onClick={() => editConcept(id, { status: 'kill' }, true)} />
                        </div>
                    }
                    {
                      (status === 'killed') &&
                        <div className="concept-list-item-user-actions">
                          <CompleteButton label='Re-Activate' onClick={() => editConcept(id, { status: 'draft' }, true)} />
                        </div>
                    }
                  </div>
              }
              {
                (postIS2 && userType === 'finance') &&
                  <div>
                    {
                      (status === 'ready') &&
                        <div className="concept-list-item-user-actions">
                          <Link to={`/vft-concept-report/${id}`}>
                            <CompleteButton label='Complete Analysis Form' />
                          </Link>
                        </div>
                    }
                    {
                      (status === 'draft') &&
                        <div className="concept-list-item-user-actions">
                          <div className="concept-list-item-marked-incomplete"><i className="far fa-clock"></i>Not Ready for Analysis</div>
                        </div>
                    }
                  </div>
              }
              {
                status === 'analysed' &&
                  <div className="concept-list-item-user-actions">
                    <div className="concept-list-item-marked-complete"><i className="fa fa-check-circle"></i>Finance Analysis Complete</div>
                  </div>
              }
            </div>
          )
        })
      }
      </div>
    </div>
  )
};

ConceptList.propTypes = {
  concepts: PropTypes.array,
  title: PropTypes.string,
  postIS2: PropTypes.bool,
  userType: PropTypes.string,
  editConcept: PropTypes.func
};

const actions = { editConcept };

export default connect(null, actions)(ConceptList);
