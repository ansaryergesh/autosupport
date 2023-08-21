import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import {getResources} from "../../service/Resources/index.js";
import Button from "../../components/Button/Button.jsx";
const QuestionAnswerContent = () => {
    const {id} = useParams();
    const [resources,setResources] = useState([]);
    const [activeResource,setActiveResource] = useState(null);

    useEffect(() => {
        console.log(id)
        getResources().then(res=> {
            setResources(res.data)
            setActiveResource(res.data[0].id);
        })
    },[])
    return (
        <div>
            {
                resources.map((resource,index) => (
                    <Button
                        onClick={() => setActiveResource(resource.id)}
                        type={`${activeResource === resource.id ? 'primary' : 'default'}`}
                        key={index}>
                        {resource.name}
                    </Button>

                ))
            }
        </div>
    )
}

export default QuestionAnswerContent;