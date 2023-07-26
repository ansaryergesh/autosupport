import React from 'react'
import { Card, Col, Row, Space } from 'antd';
import styles from './index.module.less';
import TestImage from 'images/freedomSm.jpg';

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
    "Сколько занимает открытие счета",
    "Сколько занимает открытие счета",
    "Сколько занимает открытие счета",
    "Сколько занимает открытие счета",
    "Сколько занимает открытие счета",
    "Сколько занимает открытие счета",
    "Сколько занимает открытие счета"
]

const DetailedQuestion = () => {
    return (
        <div>
            <Row gutter={[24, 24]}>
                <Col span={16}>
                    <div className={styles.content}>
                        <Space direction='vertical' size={16}>
                            <p className="my-heading-2">Описание шагов</p>
                            <Space direction='vertical' size="small">
                                {dataStep.map((item) => (
                                    <p className='my-paragraph'>{item}</p>
                                ))}
                                <img src={TestImage} />
                                {dataStep2.map((item) => (
                                    <p>{item}</p>
                                ))}
                                <img src={TestImage} />
                            </Space>
                        </Space>
                    </div>
                </Col>
                <Col span={7}>
                    <div className={styles.content}>
                        <Space direction='vertical' size={16}>
                            <p className="my-heading-2">Похожие вопросы</p>
                            {dataQuestions.map((item) => (
                                <p className={`my-paragraph ${styles.similar}`}> {item} </p>
                            ))}
                        </Space>
                    </div>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={16}>
                    <div className={styles.content}>
                        <p className="my-heading-2">Выбрать вид инструкции </p>
                        <p className='my-paragraph'> 1. Визуальная инструкция(вам будут показаны фотографии с дальнейщими шагами)</p>
                        <p className='my-paragraph'> 2. Видео инструкция(полная видео инструкция как получить ответ)</p>

                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default DetailedQuestion;    