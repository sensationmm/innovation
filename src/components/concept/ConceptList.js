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

  openUpdateComment = (id, name, status) => {
    this.setState({
      openCommentConfirm: true,
      updateData: { id, name, status }
    })
  }

  submitConceptUpdate = (comment) => {
    const { updateData: { id, status } } = this.state;
    const { editConcept } = this.props;
    editConcept(id, { status, comment }, true)
    this.setState({
      openCommentConfirm: false,
      updateData: null
    })
  }

  cancelConceptUpdate = () => {
    this.setState({
      openCommentConfirm: false,
      updateData: null
    })
  }

  render() {
   const { postIS2, userType, concepts } = this.props;

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
                         ? <KillButton label='Archive' onClick={() => this.openUpdateComment(id, name, 'killed')} />
                         : <CompleteButton label='Restore' onClick={() => this.openUpdateComment(id, name, 'draft')} />
                     }
                   </div>
               }
               {
                 (postIS2 && (userType === 'admin' || userType === 'member')) &&
                   <div>
                     {
                       (status === 'ready') &&
                         <div className="concept-list-item-user-actions">
                           <div className="concept-list-item-marked-awaiting"><i className="far fa-clock"></i>Awaiting Lead Analysis</div>
                         </div>
                     }
                     {
                       (status === 'draft') &&
                         <div className="concept-list-item-user-actions">
                           <CompleteButton label='Mark as Ready' onClick={() => this.openUpdateComment(id, name, 'ready')} />
                           <KillButton label='Archive' onClick={() => this.openUpdateComment(id, name, 'killed')} />
                         </div>
                     }
                     {
                       (status === 'killed') &&
                         <div className="concept-list-item-user-actions">
                           <CompleteButton label='Restore' onClick={() => this.openUpdateComment(id, name, 'draft')} />
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
                     <div className="concept-list-item-marked-complete"><i className="fa fa-check-circle"></i>Leadership Analysis</div>
                   </div>
               }

             </div>
           )
         })
       }
       </div>
       {
         this.state.openCommentConfirm &&
           <CommentConfirmUpdate
              id={this.state.updateData.id}
              name={this.state.updateData.name}
              changes={{ status: this.state.updateData.status}}
              type="Concept"
              onCancel={this.cancelConceptUpdate}
              onSubmit={this.submitConceptUpdate}
           />
       }
     </div>
   )
  }
}

ConceptList.propTypes = {
  concepts: PropTypes.array,
  postIS2: PropTypes.bool,
  userType: PropTypes.string,
  editConcept: PropTypes.func
};

const actions = { editConcept };

export default connect(null, actions)(ConceptList);
