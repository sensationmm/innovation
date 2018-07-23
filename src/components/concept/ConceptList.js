import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import ConceptAvatar from './ConceptAvatar';
import KillButton from '../buttons/KillButton';
import CompleteButton from '../buttons/CompleteButton';

import '../../styles/css/concept-list.css';

/**
 * ConceptList
 *
 * Renders a list of concepts in a portfolio
 *
 * @param {array} concepts - array of concept objects to display.
 * @param {string} title - title for the concepts list header
 * @param {string} status - status of the concepts being displayed - killed, active, complete.
 * @param {bool} postIS2 - is the innovation now past IS2? Causes some functionality changes.
 */

const userType = 'finance'; // TODO: get this conditionally from  redux store auth.user

const ConceptList = props => {
  const { postIS2 } = props;
  return (
    <div className="concept-list">
      <div className="concept-list-header">{props.title}</div>
      <div>For testing: {userType}</div>
      <div className="concept-list-items">
      {
        props.concepts.map(concept => {
          const {
            id,
            name,
            logo,
            ident,
            color,
            strapline,
            status
          } = concept;
          return (
            <div className="concept-list-item" key={`concept-${id}`}>
              <Link className="concept-list-item-link" to={`/concept/${id}`}>
                <div className="concept-list-item-details">
                  <ConceptAvatar conceptId={id} ident={ident} color={color} logo={logo} showLink={false}/>
                  <h3>{name}</h3>
                  <p>{strapline}</p>
                  <div>For testing: {status}</div>
                </div>
              </Link>
              {
                !postIS2 &&
                  <div className="concept-list-item-user-actions">
                      {
                        (status === 'active' || status ==='complete')
                          ? <KillButton label='Kill' onClick={() => console.log('set concept.status to killed')} />
                          : <CompleteButton label='Re-Activate' onClick={() => console.log('Set concept.status to active')} />
                      }
                  </div>
              }
              {
                userType === 'teamGM' && postIS2 &&
                  <div>
                    {
                      (status === 'complete') &&
                        <div className="concept-list-item-user-actions">
                          <div className="concept-list-item-marked-complete"><i className="far fa-clock"></i>Awaiting VFT Analysis</div>
                        </div>

                    }
                    {
                      (status === 'active') &&
                        <div className="concept-list-item-user-actions">
                          <CompleteButton label='Mark as Complete' onClick={() => console.log('Set concept.status complete and Notify VFT')} />
                          <KillButton label='Kill' onClick={() => console.log('set concept.status to killed')} />
                        </div>
                    }
                    {
                      status === 'killed' &&
                      <div className="concept-list-item-user-actions">
                        <CompleteButton label='Re-Activate' onClick={() => console.log('Set concept.status active')} />
                      </div>
                    }
                  </div>
              }
              {
                userType !== 'teamGM' && postIS2 &&
                  <div>
                    {
                      (status === 'complete') &&
                        <div className="concept-list-item-user-actions">
                          <Link to='/concept-finance-report'>
                            <CompleteButton label='Complete Analysis Form' />
                          </Link>
                        </div>
                    }
                    {
                      (status === 'active') &&
                        <div className="concept-list-item-user-actions">
                          <div className="concept-list-item-marked-complete"><i className="far fa-clock"></i>Concept Incomplete</div>
                        </div>
                    }
                  </div>
              }
              {
                status === 'reviewed' &&
                  <div className="concept-list-item-user-actions">
                    <div className="concept-list-item-marked-complete"><i className="fa fa-check-circle"></i>Finance Review Complete</div>
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
  conceptsById: PropTypes.array
};

export default ConceptList;
