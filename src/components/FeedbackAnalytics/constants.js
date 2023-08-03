export const UserData = [
  {
    id: 1,
    review: 'Отзывы с оценкой 5',
    reviewsNum: 5000
  },
  {
    id: 2,
    review: 'Отзывы с оценкой 4',
    reviewsNum: 4000
  },
  {
    id: 3,
    review: 'Отзывы с оценкой 3',
    reviewsNum: 2300
  },
  {
    id: 4,
    review: 'Отзывы с оценкой 2',
    reviewsNum: 1000
  },
  {
    id: 5,
    review: 'Отзывы с оценкой 1',
    reviewsNum: 500
  }
];

export const options = {
  plugins: {
    legend: {
      labels: {
        textAlign: 'right',
        font: {
          size: 16
        },
        padding: 16,
        usePointStyle: true
      },
      position: 'right'
    },
    title: {
      fontSize: '24px',
      display: true,
      text: 'Средний балл: 3.5',
      position: 'bottom'
    }
  }
};
