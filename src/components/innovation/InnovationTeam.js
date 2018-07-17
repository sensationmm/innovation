import React from 'react';

import ContentBox from '../layout/ContentBox';

import '../../styles/css/innovation-team.css';

const InnovationTeam = (props) => {
  const { teamMembers } = props;
  return (
    <ContentBox>
      {
        teamMembers.map(teamMember => (
          <div key={`${teamMember.name}`} className="innovation-team-container-display">
            <div>{teamMember.position}: </div>
            <div>{teamMember.name}</div>
          </div>
        ))
      }
    </ContentBox>
  )

}

export default InnovationTeam;
