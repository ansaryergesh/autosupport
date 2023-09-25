import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { useState } from 'react';
import { dataList } from './constants.js';
import styles from './index.module.less';
import { List, Typography } from 'antd';
import { i18n } from '../../utils/i18next.js';
import { getAnalytics } from '../../service/Feedback/index.js';
import { StarFilled } from '@ant-design/icons';
import TypographyHead from '../Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../Typography/constants.js';
import Button from '../../components/Button/Button.jsx';
import { handleExport } from '../../helpers/downloadFile.js';
import { getAnswersExcel } from '../../service/Answer/index.js';

const backgroundColor = ['#13AD63', '#1A6B9F', '#FFD700', '#F9971B', '#F9541B'];
const reversed = backgroundColor.slice().reverse();

const FeedbackAnalytics = () => {
  const [data, setData] = useState();

  const getAnalyticsList = () => {
    getAnalytics().then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getAnalyticsList();
  }, []);

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const dataValue = dataset.data[context.dataIndex];
            return dataValue + '%';
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <TypographyHead
        content={i18n.t('feedback.ResponseAnalytics')}
        type={TypoGraphyType.SECONDARY_HEAD}
      />

      <div className={styles.analyticsBox}>
        <div style={{ width: '250px', height: '250px' }}>
          <Pie
            data={{
              labels: data?.percents
                .sort((a, b) => a.score - b.score)
                .map((item) => `Оценка ${item.score}`),
              datasets: [
                {
                  data: data?.percents.map((item) => item.percent),
                  backgroundColor: reversed,
                },
              ],
            }}
            options={chartOptions}
          />
        </div>

        <List
          split={false}
          dataSource={dataList}
          renderItem={(item, index) => (
            <List.Item style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography.Text mark>
                <div className={styles.circle} style={{ background: backgroundColor[index] }}></div>
              </Typography.Text>
              <TypographyHead
                className={styles.rateText}
                type={TypoGraphyType.LEVEL_2}
                content={item}
              />
            </List.Item>
          )}
        />
      </div>

      <p style={{ marginBottom: '16px' }}>
        {i18n.t('feedback.averageRating')}: {Number(data?.average).toFixed(2)}{' '}
        <StarFilled style={{ color: '#13AD63' }} />
      </p>

      <Button
        onClick={() => handleExport(getAnswersExcel, i18n.t('allAnswers'))}
        type="primary"
        className={styles.btnDownload}
      >
        {i18n.t('actions.downloadAnswers')}
      </Button>
    </div>
  );
};

export default FeedbackAnalytics;
