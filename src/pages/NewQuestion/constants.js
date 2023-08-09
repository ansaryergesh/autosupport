const optionsSimilar = [
  {
    value: 'Сколько занимает открытие счета',
    label: 'Сколько занимает открытие счета'
  },
  {
    value: 'Как проверить баланс',
    label: 'Как проверить баланс'
  },
  {
    value: 'Мне не приходит код',
    label: 'Мне не приходит код'
  },

  {
    value: 'Как закрыть счет',
    label: 'Как закрыть счет'
  }
];

const optionsKeywords = [
  {
    value: 'банк',
    label: 'банк'
  },
  {
    value: 'недвижимость',
    label: 'недвижимость'
  }
];

export const selectPropsSimilar = {
  mode: 'multiple',
  options: optionsSimilar,
  placeholder: 'Выберите похожие вопросы',
  maxTagCount: 'responsive'
};

export const selectPropsKeywords = {
  mode: 'multiple',
  options: optionsKeywords,
  placeholder: 'Выберите ключевые слова',
  maxTagCount: 'responsive'
};
