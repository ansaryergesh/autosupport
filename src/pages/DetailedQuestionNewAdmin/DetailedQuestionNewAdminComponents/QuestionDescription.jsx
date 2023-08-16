import { Space } from 'antd';
import React from 'react';
import styles from './index.module.less';
import InstructionChoice from './InstructionChoice';
import SunEditor from 'suneditor-react';

const QuestionDescription = () => {

    return (
        <div className={styles.content}>
            <Space direction="vertical" size={15}>
                <div>
                    <Space direction='vertical' size={20}>
                        <p className='my-heading-2'>Описание шагов</p>
                        <SunEditor />
                    </Space>
                </div>
                <Space direction="vertical" size={25}>
                    <div>
                        <Space direction="vertical">
                            <h4>Нашел ошибку в тексте?</h4>
                            <p>Выдели и нажми CTRL+Enter</p>
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
