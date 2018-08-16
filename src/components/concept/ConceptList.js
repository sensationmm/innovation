import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import ConceptAvatar from './ConceptAvatar';
import KillButton from '../buttons/KillButton';
import CompleteButton from '../buttons/CompleteButton';
import CommentConfirmUpdate from '../layout/CommentConfirmUpdate';

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

class ConceptList extends Component {
  state = {
   openCommentConfirm: false,
   updateData: null
  }

  openUpdateComment = (id, name, newStatus) => {
    this.setState({
      openCommentConfirm: true,
      updateData: { id, name, newStatus}
    })
  }

  submitConceptUpdate = () => {
    const { updateData: id, name, newStatus} = this.state;
    editConcept(id, { status: 'killed' }, true)
  }

  cancelConceptUpdate = () => {
    this.setState({
      openCommentConfirm: false,
      updateData: null
    })
  }

  render() {
   const { postIS2, userType, concepts, editConcept } = this.props;

   return (
     <div className="concept-list">
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
                   <ConceptAvatar conceptId={id} ident={ident || 'IN'} color={color || 'darkblue'} logo={logo} showLink={false}/>
                   <h3>{name}</h3>
                   <p className="concept-list-item-details-description">{description}</p>
                 </div>
               </Link>
               {
                 (!postIS2 && (userType === 'admin' || userType === 'member')) &&
                   <div className="concept-list-item-user-actions">
                     {
                       (status === 'draft' || status ==='ready')
                         ? <KillButton label='Archive' onClick={() => editConcept(id, { status: 'killed' }, true)} />
                         : <CompleteButton label='Re-Activate' onClick={() => editConcept(id, { status: 'draft' }, true)} />
                     }
                   </div>
               }
               {
                 (postIS2 && (userType === 'admin' || userType === 'member')) &&
                   <div>
                     {
                       (status === 'ready') &&
                         <div className="concept-list-item-user-actions">
                           <div className="concept-list-item-marked-awaiting"><i className="far fa-clock"></i>Awaiting VFT Analysis</div>
                         </div>
                     }
                     {
                       (status === 'draft') &&
                         <div className="concept-list-item-user-actions">
                           <CompleteButton label='Mark as Ready' onClick={() => editConcept(id, { status: 'ready' }, true)} />
                           <KillButton label='Archive' onClick={() => editConcept(id, { status: 'killed' }, true)} />
                         </div>
                     }
                     {
                       (status === 'killed') &&
                         <div className="concept-list-item-user-actions">
                           <CompleteButton label='Restore' onClick={() => editConcept(id, { status: 'draft' }, true)} />
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
       <CommentConfirmUpdate
          id={this.state.updateData.id}
          name={this.state.updateData.name}
          changes={{ status: this.state.updateData.newState}}
          onCancel={this.cancelConceptUpdate}
          onSubmit={this.submitConceptUpdate}
       />
     </div>
   )
  };
}

ConceptList.propTypes = {
  concepts: PropTypes.array,
  postIS2: PropTypes.bool,
  userType: PropTypes.string,
  editConcept: PropTypes.func
};

const actions = { editConcept };

export default connect(null, actions)(ConceptList);
