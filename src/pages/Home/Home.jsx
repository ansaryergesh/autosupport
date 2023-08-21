import React, {useEffect, useState} from 'react';
import CardComponent from "components/Card/Card";
import {Col, Row} from "antd";
import JHeader from "components/JHeader/JHeader.jsx";
import {getCategories} from "../../service/Category/index.js";

const Home = () => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        getCategoryAll();
    },[])

    const getCategoryAll = () => {
        getCategories().then(res=> {
            setAllCategories(res.data)
        })
    }
    return (
        <div>
            <JHeader isQuestion={false}/>
            <Row gutter={[24,24]}>
                {allCategories.map((item,index) => (
                    <Col key={index} span={8}>
                        <CardComponent data={item}/>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default Home;