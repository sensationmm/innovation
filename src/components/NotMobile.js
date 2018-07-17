import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Not Mobile
 *
 * Redirect screen for non-mobile pages
 */

const NotMobile = props => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Not Available</h1>
    <p>This screen is not available on a mobile device. Please view on desktop</p>
    <Link to="/">Return to Homescreen</Link>
  </div>
);

export default NotMobile;
