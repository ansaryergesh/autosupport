import { Space } from 'antd'
import React from 'react'
import styles from './index.module.less';
import InstructionChoice from './InstructionChoice';

const QuestionDescription = () => {

    const dataStep = [
        "1. Зайдите в раздел “Категории”",
        "2. Нажмите на кнопку Поиска",
        "3. В окне Поиска введите название компании, или тикер ценной бумаги",
        "4. Выберите нужный вам тикер(для покупки ценных бумаг на американских рынках, тикер должен содеражать .US)",
        "5. Укажите тип операции(Купить или Продать)",
        "6. Укажите количество бумаг, которые хотите купить",
        "7. Откройте Сессию Безопасности через СМС-код"
    ]
    return (
        <div className={styles.content}>
            <Space direction='vertical' size={15} >
                <div>
                    <h2>Описание шагов</h2>
                    <Space direction='vertical' size="small">
                        {dataStep.map((item, index) => (
                            <p key={index} className='my-paragraph'>{item}</p>
                        ))}
                    </Space>
                </div>
                <Space direction='vertical' size={25}>
                    <div>
                        <Space direction='vertical'>
                            <h4>Нашел ошибку в тексте?</h4>
                            <p>Выдели и нажми CTRL+Enterrr</p>
                        </Space>
                    </div>
                    <div>
                        <InstructionChoice />
                    </div>
                </Space>
            </Space>
        </div>
    )
}

export default QuestionDescription