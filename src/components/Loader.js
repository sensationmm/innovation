import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../styles/css/loader.css';

const Loader = (props) => {
	return (
		<div className={classnames('loader', { mini: props.mini })}>
			<div className="lds-ripple">
				<div />
				<div />
			</div>
		</div>
	);
};

Loader.propTypes = {
	mini: PropTypes.bool
}

Loader.defaultProps = {
	mini: false
}

export default Loader;
