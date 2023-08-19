import React from 'react'
import ResourceButtons from './DetailedQuestionNewComponents/ResourceButtons';
import QuestionDescription from './DetailedQuestionNewComponents/QuestionDescription';
import RateStars from './DetailedQuestionNewComponents/RateStars';



const DetailedQuestionNew = () => {
    return (
        <div>
           <ResourceButtons />
            <QuestionDescription />
            <RateStars />
        </div>
    );
};
export default DetailedQuestionNew;
