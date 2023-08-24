import React from 'react';
import PropTypes from 'prop-types';
import './index.module.less';
import { fontSize, fontWeight, paddingSize } from './constants.js';
const TypographyHead = ({ content, type, className }) => {
  return (
    <>
      <span
          className={className}
        style={{
            paddingBottom: paddingSize(type),
            fontSize: fontSize(type),
          fontWeight: fontWeight(type),
        }}>
        {content}
      </span>
    </>
  );
};

TypographyHead.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
export default TypographyHead;