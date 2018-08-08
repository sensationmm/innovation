import React from 'react';
import PropTypes from 'prop-types';

import BackTextLink from './buttons/BackTextLink';

/**
 * Not Found
 *
 * 404 page
 */

const NotFound = props => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Page Not Found</h1>
    <div style={{ textAlign: 'center' }}>
      <BackTextLink
        label="Your Dashboard"
        onClick={() => props.history.push('/dashboard')}
      />
    </div>
  </div>
);

NotFound.propTypes = {
  history: PropTypes.object
};

export default NotFound;
