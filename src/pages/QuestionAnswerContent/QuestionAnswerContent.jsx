import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import {getResources} from "../../service/Resources/index.js";
import Button from "../../components/Button/Button.jsx";
import {editCategoryQuestion, getQuestionById, getQuestions} from "../../service/Question/index.js";
import JHeader from "../../components/JHeader/JHeader.jsx";
import {initialQuestionDto} from "../../components/JHeader/constants.js";
import Plus from 'images/plus.svg'
import {Col, notification, Row} from "antd";
import SunEditor from "../DetailedQuestionAdmin/SunEditor.jsx";
import styles from './index.module.less'
import TypographyHead from "../../components/Typography/TypographyHead.jsx";
import {TypoGraphyType} from "../../components/Typography/constants.js";
import {INSTRUCTION_TYPE, LANG_KEY} from "../../constants/index.js";
import {i18n} from "../../utils/i18next.js";
import ImageUpload from "../../components/ImageUpload/ImageUpload.jsx";
import {VideoInstruction} from "../../components/VideoInstruction/VideoInstruction";
import {searchKeyWords, manageKeyword} from "../../service/Keywords/index.js";
import SearchReference from "../SearchAutoComplete/SearchReference";
import {manageTag, searchTags} from "../../service/Tags/index.js";
import SearchSimilarQuestion from "../SearchAutoComplete/SearchSimilarQuestion";
import {initialQuestionAnswerContent} from "./constants.js";
import {answerByQuestionAndResource, addAnswerToQuestion, editAnswerQuestion} from "../../service/Answer/index.js";

const QuestionAnswerContent = () => {
    const {id} = useParams();
    const [resources,setResources] = useState([]);
    const [selectedResources,setSelectedResources] = useState([])
    const [activeResource,setActiveResource] = useState(null);
    const [questionInfo, setQuestionInfo] = useState({initialQuestionDto});
    const [instructionType, setInstructionType] = useState(INSTRUCTION_TYPE.VIDEO);
    const [selectedKeyWords, setSelectedKeyWords] = useState(questionInfo?.keyWords || []);
    const [selectedTags, setSelectedTags] = useState(questionInfo?.tags || []);
    const [selectedQuestions,setSelectedQuestions] = useState([]);
    const [selectedLanguage,setSelectedLanguage] = useState(LANG_KEY.KZ);
    const [answerFormData, setAnswerFormData] = useState(initialQuestionAnswerContent);
    useEffect(() => {
        getResources().then(res=> {
            setResources(res.data);
            setSelectedResources(res.data.map(res=> {
                return {...res,edit:false}
            }));
            setActiveResource(res.data[0]);
        })
    },[id]);

    useEffect(() => {
        setAnswerFormData(initialQuestionAnswerContent)
        if(activeResource) {
            answerByQuestionAndResource(id, activeResource.id)
                .then(res=> {
                    setAnswerFormData(res.data)
                })
                .catch(err=> {
                    console.error(err)
                    setAnswerFormData(initialQuestionAnswerContent)
                })
                .finally(()=> {
                getQuestionById(id).then(res=> {
                    setQuestionInfo(res.data);
                })
                })
        }
    },[activeResource])


    const handleSubmit = () => {
        // addAnswerToQuestion
        const finalDataAnswer ={...answerFormData, question: {id: questionInfo.id}, resource: {id: activeResource.id}}
        editCategoryQuestion(questionInfo).then(res=> {
            console.log(res)
            if(answerFormData.id) {
                editAnswerQuestion(finalDataAnswer, answerFormData.id).then(res=> {
                    console.log(res)
                    notification.info('Answer added')
                })
            } else {
                delete finalDataAnswer['id'];
                addAnswerToQuestion(finalDataAnswer).then(res=> {
                    console.log(res);
                    notification.info('Answer edited')
                })
            }

        })
    }
    return (
        <div>
            <JHeader questionInfo={questionInfo}/>
            <div style={{padding: '12px 0', display: "flex", alignItems: 'center', gap: '8px'}}>
                {
                    selectedResources.map((resource,index) => (
                        <Button
                            onClick={() => setActiveResource(resource)}
                            type={`${activeResource.id === resource.id ? 'default-active' : 'default'}`}
                            key={index}>
                            {resource.name}
                        </Button>
                    ))
                }
                {selectedResources.length < resources.length && <img src={Plus} />}

            </div>
            <div style={{padding: '12px 0', display: "flex", alignItems: 'center', gap: '8px'}}>
                {Object.values(LANG_KEY).map(item => (
                    <Button
                        key={item}
                        onClick={() => setSelectedLanguage(item)}
                        type={`${selectedLanguage === item ? 'default-active' : 'default'}`}>
                        {item}
                    </Button>
                ))}
            </div>
            <Row gutter={[24,24]}>
                <Col span={15}>
                    <div className={styles.card}>
                        <TypographyHead type={TypoGraphyType.SUB_HEAD} content={'Description'} />
                        <SunEditor
                            answerFormData={answerFormData}
                            setAnswerFormData={setAnswerFormData}
                            selectedLanguage={selectedLanguage}
                        />
                    </div>
                </Col>
                <Col span={9} className={styles.card}>
                    <SearchSimilarQuestion
                        title={'Add similar request'}
                        searchAction={getQuestions}
                        selectedItems={selectedQuestions}
                        setSelectedItems={setSelectedQuestions}
                    />
                </Col>
                <Col span={24}>
                    <div className={styles.card}>
                        <p className="my-heading-2">Выбрать вид инструкции </p>
                        <p className='my-paragraph'> 1. Визуальная инструкция(вам будут показаны фотографии с дальнейщими шагами)</p>
                        <p className='my-paragraph'> 2. Видео инструкция(полная видео инструкция как получить ответ)</p>
                        <div style={{padding: '16px 0'}}>
                            {Object.values(INSTRUCTION_TYPE).map(item => (
                                <Button
                                    key={item}
                                    onClick={() => setInstructionType(item)}
                                    type={item === instructionType ? 'default-active' : 'active'}>
                                    {i18n.t(item)}
                                </Button>
                            ))}
                            {instructionType === INSTRUCTION_TYPE.VISUAL && <ImageUpload />}
                            {instructionType === INSTRUCTION_TYPE.VIDEO && <VideoInstruction
                                answerFormData={answerFormData}
                                setAnswerFormData={setAnswerFormData}
                                selectedLanguage={selectedLanguage}
                            />}
                        </div>

                    </div>

                </Col>
                <Col span={12}>
                    <div className={styles.card}>
                        <SearchReference
                            keyItem={'keyWords'}
                            setQuestionInfo={setQuestionInfo}
                            questionInfo={questionInfo}
                            title={'Add keywords'}
                            searchAction={searchKeyWords}
                            selectedItems={selectedKeyWords}
                            setSelectedItems={setSelectedKeyWords}
                            addNewRecords={manageKeyword}
                            selectedLanguage={selectedLanguage}
                        />
                    </div>
                </Col>
                <Col span={12} className={styles.card}>
                        <SearchReference
                            keyItem={'tags'}
                            setQuestionInfo={setQuestionInfo}
                            questionInfo={questionInfo}
                            title={'Add tags'}
                            searchAction={searchTags}
                            selectedItems={selectedTags}
                            setSelectedItems={setSelectedTags}
                            addNewRecords={manageTag}
                            selectedLanguage={selectedLanguage}

                        />
                </Col>
                <Button type={'primary'} onClick={() => handleSubmit()}>Submit</Button>
            </Row>
        </div>
    )
}

export default QuestionAnswerContent;