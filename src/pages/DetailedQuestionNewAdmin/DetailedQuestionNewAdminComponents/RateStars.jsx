import { Rate, Space } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import styles from './index.module.less';

const RateStars = () => {
    return (
        <div className={styles.content}>
            <Space direction='vertical' size={17}>
                <p className='my-heading-2'>Полезен ли был ответ?</p>
                <Space direction="vertical" size={15}>
                    <p className="my-paragraph">
                        Просьба оценить ответ по 5-и бальной шкале, это поможет нам стать
                        лучше
                    </p>
                    <Rate className={styles.rateStars} />
                    <Button type="third">Оставить отзыв</Button>
                </Space>
            </Space>
        </div>
    );
};

export default RateStars;
