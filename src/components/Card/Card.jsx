import {Card, Typography} from "antd";
import React from 'react'
import styles from './index.module.less';
import { Link } from 'react-router-dom';
const CardComponent = (props) => {
    const { Text } = Typography;
    const questions = props.data?.questions;
    const maxQuestionsToShow = 4; // Maximum number of questions to show without ellipsis

    return (
        <Link to={'/detailedQuestionNewAdmin'}>
            <Card className={styles.card} bordered={false}>
                <div className={"my-heading-2"}>
                    <div className={styles.title}>
                        <Text ellipsis={{ rows: 2, expandable: false }}>
                            {props.data?.categorieContents.name}
                        </Text>
                    </div>
                </div>
                <div className={styles.content}>
                    {questions?.slice(0, maxQuestionsToShow).map((q, index) => (
                        <p key={index} style={{ marginBottom: "11px" }}>
                            <Text ellipsis={{ rows: 2, expandable: false }}>
                                {q.questionContents.title}
                            </Text>
                        </p>
                    ))}
                    {questions?.length > maxQuestionsToShow && (
                        <Text style={{ color: '#1890ff', cursor: 'pointer' }}>
                            ...and {questions.length - maxQuestionsToShow} more questions
                        </Text>
                    )}
                </div>
            </Card>
        </Link>
    )
}

export default CardComponent