import React from 'react';
import Title from 'antd/lib/typography/Title.js';
// eslint-disable-next-line no-unused-vars
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { UserData, dataList } from './constants.js';
import styles from './index.module.less';
import { List, Typography } from 'antd';
import { i18n } from '../../utils/i18next.js';

const backgroundColor = ['#13AD64', '#0D99FF', '#FF900D', '#120DFF', '#FF0000'];
const FeedbackAnalytics = () => {
  const [userData] = useState({
    labels: UserData.map((data) => data.review),
    datasets: [
      {
        data: UserData.map((data) => data.reviewsNum),
        backgroundColor: backgroundColor
      }
    ]
  });

  const calculatePercentage = (value, total) =>
    ((value / total) * 100).toFixed(2);

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const total = dataset.data.reduce(
              (previousValue, currentValue) => previousValue + currentValue
            );
            const currentValue = dataset.data[context.dataIndex];
            const percentage = calculatePercentage(currentValue, total);
            return ` ${currentValue} (${percentage}%)`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      <Title level={3}>{i18n.t('Feedback.ResponseAnalytics')}</Title>

      <div className={styles.analyticsBox}>
        <div style={{ width: '250px', height: '250px' }}>
          <Pie data={userData} options={chartOptions} />
        </div>

        <List
          split={false}
          dataSource={dataList}
          renderItem={(item, index) => (
            <List.Item
              style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
              <Typography.Text mark>
                <div
                  className={styles.circle}
                  style={{ background: backgroundColor[index] }}></div>
              </Typography.Text>
              {item}
            </List.Item>
          )}
        />
      </div>
      <p>Средний балл 3.5</p>
    </div>
  );
};

export default FeedbackAnalytics;
