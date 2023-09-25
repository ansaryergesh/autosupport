import React from 'react';
import PropTypes from 'prop-types';
import './index.module.less';
import { fontSize, fontWeight, paddingSize, color } from './constants.js';
const TypographyHead = ({ content, type, className }) => {
  return (
    <>
      <p
        className={className}
        style={{
          fontSize: fontSize(type),
          color: color(type),
          fontWeight: fontWeight(type),
          paddingBottom: paddingSize(type),
        }}
      >
        {content}
      </p>
    </>
  );
};

TypographyHead.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
export default TypographyHead;
