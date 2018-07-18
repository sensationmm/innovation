import React from 'react';
import PropTypes from 'prop-types';

import ContentBox from '../layout/ContentBox';

import '../../styles/css/innovation-team.css';

const InnovationTeam = (props) => {
  const { teamMembers } = props;
  return (
    <ContentBox>
      <div className="innovation-team-container-display">
      {
        teamMembers.map((teamMember, index) => (
          <div key={`${index}-${teamMember.name}`} className="innovation-team-member">
            <div>{teamMember.name}</div>
            <div>({teamMember.position})</div>
          </div>
        ))
      }
      </div>
    </ContentBox>
  )
}

InnovationTeam.propTypes = {
  teamMembers: PropTypes.array
}

export default InnovationTeam;
