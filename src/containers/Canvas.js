import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import FlexColumn from '../components/layout/FlexColumn';
import CanvasGrid from '../components/CanvasGrid';

import '../styles/css/canvas.css';
 
const Canvas = () => {
  return (
    <div className="canvas">
      <FlexRow layout={['25%','35%','40%']}>
        <FlexColumn>
          <ContentBox>
            <div className="canvas-grid-header">Who is it for?</div>
            <CanvasGrid />
          </ContentBox>
          <ContentBox>
            <div className="canvas-grid-header">What is the pain point / opportunity?</div>
            <CanvasGrid />
          </ContentBox>
          <ContentBox>
            <div className="canvas-grid-header">Relevant technologies</div>
            <CanvasGrid />
          </ContentBox>
        </FlexColumn>

        <FlexColumn>
          <ContentBox>
            <div className="canvas-grid-header">What is the idea?</div>
            <CanvasGrid />
          </ContentBox>
          <ContentBox>
            <div className="canvas-grid-header">How does it work?</div>
            <CanvasGrid />
          </ContentBox>
        </FlexColumn>

        <FlexColumn layout={['55%','22.5%','22.5%']}>
          <ContentBox>
            <div className="canvas-grid-header">Storyboard</div>
            <CanvasGrid />
          </ContentBox>
          <FlexRow>
            <ContentBox>
              <div className="canvas-grid-header">For the person / people</div>
              <CanvasGrid />
            </ContentBox>
            <ContentBox>
              <div className="canvas-grid-header">For the company</div>
              <CanvasGrid />
            </ContentBox>
          </FlexRow>
          <ContentBox>
            <div className="canvas-grid-header">How does it align to the companys aspirations?</div>
            <CanvasGrid />
          </ContentBox>
        </FlexColumn>

      </FlexRow>
    </div>
  );
}

Canvas.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(Canvas);
