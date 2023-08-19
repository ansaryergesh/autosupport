import React from 'react';
import PropTypes from 'prop-types';
import './index.module.less';
import { fontSize, fontWeight, paddingSize } from './constants.js';
const TypographyHead = ({ content, type }) => {
  return (
    <>
      <span
        style={{
          fontSize: fontSize(type),
          fontWeight: fontWeight(type),
          color: 'black',
          paddingBottom: paddingSize(type)
        }}>
        {content}
      </span>
    </>
  );
};

TypographyHead.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string
};
export default TypographyHead;
