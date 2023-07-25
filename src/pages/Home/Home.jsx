import React from 'react';
import CardComponent from "components/Card/Card";
import {Col, Row} from "antd";
import JHeader from "components/JHeader/JHeader.jsx";

const data = [
    {title: "titl1", questions: ["question1","question2","question3"]},
    {title: "titl1", questions: ["question1","question2","question3"]},
    {title: "titl1", questions: ["question1","question2","question3"]},]
const Home = () => {
    return (
        <div>
            <JHeader />
            <Row gutter={24}>
                {data.map((item) => (
                    <Col span={8}>
                        <CardComponent data={item}/>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default Home;