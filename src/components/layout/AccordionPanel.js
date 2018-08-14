import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/css/accordion-panel.css'

class AccordionPanel extends Component {
  state = {
    isOpen: true
  }

  componentDidMount = () => {
    this.setState({ isOpen: this.props.initIsOpen})
  }

  render() {
    const { title, children } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <div className="accordion-panel-header" onClick={() => this.setState({ isOpen: !isOpen })}>
          <div>
            {title}
          </div>
          <div className="accordion-panel-header-toggle">
            {
              isOpen
                ? 'Hide'
                : 'Show'
            }
          </div>
        </div>
        <div className={classnames('accordion-panel-content', { 'open' : isOpen }, { 'closed' : !isOpen })}>{children}</div>
      </div>
    )
  }
}

AccordionPanel.propTypes = {
  initIsOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ])
};


export default AccordionPanel;
