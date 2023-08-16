import React from 'react'
import ResourceButtons from './DetailedQuestionNewComponents/ResourceButtons';
import QuestionDescription from './DetailedQuestionNewComponents/QuestionDescription';
import { Space } from 'antd';
import RateStars from './DetailedQuestionNewComponents/RateStars';



const DetailedQuestionNew = () => {
    return (
        <div>
            <Space direction='vertical' size={20}>
                <Space direction='vertical' size={30}>
                    <ResourceButtons />
                    <QuestionDescription />
                </Space>
                <RateStars />
            </Space>
        </div>
    );
};
export default DetailedQuestionNew;