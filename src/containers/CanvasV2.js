import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import ContentBox from '../components/layout/ContentBox';
import FlexRow from '../components/layout/FlexRow';
import FlexColumn from '../components/layout/FlexColumn';
import CanvasContent from '../components/CanvasContent';
import CanvasUpload from '../components/CanvasUpload';

import '../styles/css/canvas-v2.css';

const CanvasV2 = () => {
  return (
    <div className="canvas2">
      <FlexRow layout={['25%','30%','45%']}>
        <FlexColumn>
          <ContentBox>
            <CanvasContent label="Who is it for?" id="" />
          </ContentBox>
          <ContentBox>
            <CanvasContent label="What is the pain point / opportunity?" id="" />
          </ContentBox>
          <ContentBox>
            <CanvasContent label="Relevant technologies" id="" />
          </ContentBox>
        </FlexColumn>

        <FlexColumn>
          <ContentBox>
            <CanvasContent label="What is the idea?" id="" />
          </ContentBox>
          <ContentBox>
            <CanvasContent label="How does it work?" id="" />
          </ContentBox>
        </FlexColumn>

        <FlexColumn layout={['45%','27.5%','27.5%']}>
          <ContentBox>
            <CanvasUpload label="Storyboard" id="" />
          </ContentBox>
          <FlexRow>
            <ContentBox>
            <CanvasContent label="For the person / people" id="" />
            </ContentBox>
            <ContentBox>
            <CanvasContent label="For the company" id="" />
            </ContentBox>
          </FlexRow>
          <ContentBox>
            <CanvasContent label="How does it align to the company's aspirations?" id="" />
          </ContentBox>
        </FlexColumn>

      </FlexRow>
    </div>
  );
}

CanvasV2.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(CanvasV2);
