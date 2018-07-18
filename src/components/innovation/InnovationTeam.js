import React from 'react';

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

export default InnovationTeam;
