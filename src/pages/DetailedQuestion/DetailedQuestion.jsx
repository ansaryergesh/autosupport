import React from 'react'
import { Card, Col, Input, Rate, Row, Space } from 'antd';
import styles from './index.module.less';
import TestImage from 'images/freedomSm.jpg';
import Button from '../../components/Button/Button';

const dataStep = [
    "1. Зайдите в раздел “Категории”",
    "2. Нажмите на кнопку Поиска",
    "3. В окне Поиска введите название компании, или тикер ценной бумаги",
    "4. Выберите нужный вам тикер(для покупки ценных бумаг на американских рынках, тикер должен содеражать .US)"
]
const dataStep2 = [
    "7. Укажите тип операции (Купить или Продать)",
    "8. Укажите количество бумаг, которые хотите купить",
]

const dataQuestions = [
    "Сколько занимает открытие счета?",
    "Сколько занимает открытие счета?",
    "Сколько занимает открытие счета?",
    "Сколько занимает открытие счета?",
    "Сколько занимает открытие счета?",
]

const DetailedQuestion = () => {
    return (
        <div>
            <Space direction='vertical' size={30}>
                <Row>
                    <Space size={10}>
                        <Button type='primary'>В приложении</Button>
                        <Button>На сайте</Button>
                        <Button>Freedom Finance PLC</Button>
                        <Button>АО Фридом Финанас</Button>
                    </Space>
                </Row>
                <Row gutter={[0, 24]}>
                    <Row gutter={[24, 24]}>
                        <Col span={16}>
                            <div className={styles.content}>
                                <Space direction='vertical' size={16}>
                                    <p className="my-heading-2  ">Описание шагов</p>
                                    <Space direction='vertical' size="small">
                                        {dataStep.map((item) => (
                                            <p className='my-paragraph'>{item}</p>
                                        ))}
                                        <img src={TestImage} />
                                        {dataStep2.map((item) => (
                                            <p className='my-paragraph'>{item}</p>
                                        ))}
                                        <img src={TestImage} />
                                    </Space>
                                </Space>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className={styles.content}>
                                <Space direction='vertical' size={23} className={styles.similar}>
                                    <p className="my-heading-2">Похожие вопросы</p>
                                    <Space direction='vertical' size={19.6}>
                                        {dataQuestions.map((item) => (
                                            <p className={`my-paragraph ${styles.similarQuestions}`}> {item} </p>
                                        ))}
                                        <p className='my-paragraph'>Сколько занимает открытие счета?</p>
                                    </Space>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col span={16}>
                            <div className={styles.content}>
                                <Space direction='vertical' size={35} className={styles.instructions}>
                                    <p className="my-heading-2">Выбрать вид инструкции </p>
                                    <Space direction='vertical' size={13} className={styles.instructionsTypes}>
                                        <p className='my-paragraph'> 1. Визуальная инструкция(вам будут показаны фотографии с дальнейщими шагами)</p>
                                        <p className='my-paragraph'> 2. Видео инструкция(полная видео инструкция как получить ответ)</p>
                                    </Space>
                                    <Row>
                                        <Space size={15}>
                                            <Button type='primary' className='my-paragraph'>Видео инструкция</Button>
                                            <Button className='my-paragraph'>Визуальная инструкция</Button>
                                        </Space>
                                    </Row>
                                    <iframe
                                        className={styles.youtubeVideoWrapper}
                                        title="Random YouTube Video"
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/pSY3i5XHHXo"
                                        allowFullScreen
                                    ></iframe>
                                    <p className='my-paragraph'>Как открыть брокерский счёт в мобильном приложении Tradernet.Global | Freedom Broker</p>
                                </Space>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className={styles.content}>
                                <Space direction='vertical' size={23.3} className={styles.rate}>
                                    <p className="my-heading-2">Полезен ли был ответ ?</p>
                                    <p className={`{my-paragraph ${styles.rateSubtitel}`}>Просьба оценить насколько был полезен ответ по 5-и больной шкале, это поможет нам стать лучше </p>
                                    <Rate />
                                    <Row>
                                        <Space size={10}>
                                            <Button type='primary'>Быстрый ответ</Button>
                                            <Button>Быстрый ответ</Button>
                                        </Space>
                                    </Row>
                                    <Row>
                                        <Space size={10}>
                                            <Button type='primary'>Быстрый ответ</Button>
                                            <Button>Быстрый ответ</Button>
                                        </Space>
                                    </Row>
                                    <Button type='primary'>Быстрый ответ</Button>
                                    <p className={`{my-paragraph ${styles.rateSubtitel}`}>Напишите полный отзыв, ваше мнение поможет стать нам лучше</p>
                                    <Input.TextArea
                                        rows={7}
                                        className={styles.quickAnswerInput}
                                        placeholder='Введите текст'
                                    />
                                    <Button type='primary'>Оставить отзыв</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Space>
        </div >
    )
}

export default DetailedQuestion;    