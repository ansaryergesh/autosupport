import React from 'react';
import Title from 'antd/lib/typography/Title.js';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { UserData, options } from './constants.js';

const FeedbackAnalytics = () => {
  const [userData] = useState({
    labels: UserData.map((data) => data.review),
    datasets: [
      {
        data: UserData.map((data) => data.reviewsNum)
      }
    ]
  });

  return (
    <div>
      <Title level={3}>Аналитика ответов</Title>
      <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
        <Pie data={userData} options={options} />
      </div>
    </div>
  );
};

export default FeedbackAnalytics;
