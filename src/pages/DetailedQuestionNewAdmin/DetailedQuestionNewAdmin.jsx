import React from 'react'
import ResourceButtons from './DetailedQuestionNewAdminComponents/ResourceButtons'
import QuestionDescription from './DetailedQuestionNewAdminComponents/QuestionDescription'
import RateStars from './DetailedQuestionNewAdminComponents/RateStars'
import { Space } from 'antd'
import PageLanguage from './DetailedQuestionNewAdminComponents/PageLanguage'

const DetailedQuestionNewAdmin = () => {
    return (
        <div>
            <Space direction='vertical' size={20}>
                <Space direction='vertical' size={30}>
                    <ResourceButtons />
                    <PageLanguage />
                    <QuestionDescription />
                </Space>
                <RateStars />
            </Space>
        </div>
    )
}

export default DetailedQuestionNewAdmin