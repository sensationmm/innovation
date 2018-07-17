import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../styles/css/slider.css';

/**
 * Slider
 *
 * Renders slidable content
 *
 * @param {number} viewable - number of children in view. Defaults to 1 in mobile view
 * @param {element|array} children - content to render in slider
 * @param {integer} slides - number of slides in slider (as a child component can be ssupplied this cannot be automatic)
 *
 * NB. a component can be passed as the content, but each slide must have a 'slideItem' class to correctly size
 */

 class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideTo: 0,
      sliderWidth: 0,
      slideWidth: 0
    };
  }

  slideRight = () => {
    let slideTo = this.state.slideTo - this.state.sliderWidth;

    if(slideTo < (this.state.slidesWidth - this.state.sliderWidth) * -1) {
      slideTo = (this.state.slidesWidth - this.state.sliderWidth) * -1;
    }

    this.setState({ ...this.state, slideTo: slideTo })
  }

  slideLeft = () => {

    let slideTo = this.state.slideTo + this.state.sliderWidth;

    if(slideTo > 0) {
      slideTo = 0;
    }
    this.setState({ ...this.state, slideTo: slideTo })
  }

  componentDidMount() {
    const { slides, viewable, breakpoint } = this.props;
    const sliderItems = document.querySelectorAll('.slider .slider-item');
    const maxWidth = document.getElementById('slider');

    const slidesInView = (breakpoint !== 'mobile') ? viewable : 1;

    const slideWidth = maxWidth.clientWidth / slidesInView;

    for(let i=0; i<sliderItems.length; i++) {
      sliderItems[i].style.width = `${slideWidth}px`;
    }

    document.getElementById('slider-inner').style.width = `${slideWidth * slides}px`;

    this.setState({
      sliderWidth: parseInt(document.getElementById('slider').clientWidth, 10),
      slidesWidth: parseInt(slideWidth * slides, 10)
    });
  }

  render() {
    const { children } = this.props;
    const { slideTo, sliderWidth, slidesWidth } = this.state;

    return (
      <div id="slider" className="slider">
        <div className="slider-viewport">
          <div id="slider-inner" className="slider-inner" style={{ left: `${slideTo}px` }}>
          {children}
          </div>
        </div>

        <div 
          className={classnames('slider-control next', { disabled: slideTo <= (slidesWidth - sliderWidth) * -1 })} 
          onClick={this.slideRight}
        >
          <i className="fas fa-2x fa-chevron-circle-right" />
        </div>

        <div 
          className={classnames('slider-control prev', { disabled: slideTo === 0 })} 
          onClick={this.slideLeft}
        >
          <i className="fas fa-2x fa-chevron-circle-left" />
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  viewable: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired,
  slides: PropTypes.number.isRequired,
  breakpoint: PropTypes.string
};

Slider.defaultProps = {
  viewable: 1
};

const mapStateToProps = state => ({
  breakpoint: state.ui.breakpoint
});

export default connect(mapStateToProps, null)(Slider);
