import {Card} from "antd";
import React from 'react'
import styles from './index.module.less';

const CardComponent = (props) => {
    // const title = props.data?.title;
    const questions = props.data?.questions;
    return (
        <div>
            <Card className={styles.card} bordered={false}>
                <div className={"my-heading-2"}>
                    <div className={styles.title}>Как открыть счет?</div>
                </div>
                <div className={styles.content}>
                    {questions?.map((q,index)=> (
                        <p key={index} style={{marginBottom:"11px"}}>{q}</p>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default CardComponent