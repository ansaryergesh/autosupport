import { Rate, Space } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import styles from './index.module.less';
import { i18n } from '../../../utils/i18next.js';

const RateStars = () => {
    return (
        <div className={styles.content}>
            <Space direction='vertical' size={17}>
                <p className='my-heading-2'>{i18n.t('DetailedQuestion.RateQuestion')}</p>
                <Space direction="vertical" size={15}>
                    <p className="my-paragraph">
                        {i18n.t('DetailedQuestion.RateSubtitel')}
                    </p>
                    <Rate className={styles.rateStars} />
                    <Button type="third">{i18n.t('DetailedQuestion.RateButton')}</Button>
                </Space>
            </Space>
        </div>
    );
};

export default RateStars;
