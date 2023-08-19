import { Space } from 'antd';
import React from 'react';
import styles from './index.module.less';
import InstructionChoice from './InstructionChoice';
import { i18n } from '../../../utils/i18next.js';

const QuestionDescription = () => {
    const dataStep = [
        '1. Зайдите в раздел “Категории”',
        '2. Нажмите на кнопку Поиска',
        '3. В окне Поиска введите название компании, или тикер ценной бумаги',
        '4. Выберите нужный вам тикер(для покупки ценных бумаг на американских рынках, тикер должен содеражать .US)',
        '5. Укажите тип операции(Купить или Продать)',
        '6. Укажите количество бумаг, которые хотите купить',
        '7. Откройте Сессию Безопасности через СМС-код'
    ];

    return (
        <div className={styles.content}>
            <Space direction="vertical" size={15}>
                <div>
                        <p className='my-heading-2'>{i18n.t('DetailedQuestion.DescriptionTitle')}</p>

                        <Space direction="vertical" size="small">
                            {dataStep.map((item, index) => (
                                <p key={index} className="my-paragraph">
                                    {item}
                                </p>
                            ))}
                    </Space>
                </div>
                <Space direction="vertical" size={25}>
                    <div>
                        <Space direction="vertical">
                            <h4>{i18n.t('DetailedQuestion.FindMistake')}</h4>
                            <p>{i18n.t('DetailedQuestion.FixMistake')}</p>
                        </Space>
                    </div>
                    <div>
                        <InstructionChoice />
                    </div>
                </Space>
            </Space>
        </div>
    );
};

export default QuestionDescription;
