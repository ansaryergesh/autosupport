import React from 'react';

const ShowHtmlContent = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default ShowHtmlContent;