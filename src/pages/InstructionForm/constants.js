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

const optionsTags = [
  {
    value: 'счет',
    label: 'счет'
  },
  {
    value: 'деньги',
    label: 'деньги'
  },
  {
    value: 'инвестиции',
    label: 'инвестиции'
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

const optionsAnswers = [
  {
    value: 'Сколько занимает открытие счета',
    label: 'Сколько занимает открытие счета'
  }
];

export const selectPropsSimilar = {
  mode: 'multiple',
  options: optionsSimilar,
  placeholder: 'Выберите похожие вопросы',
  maxTagCount: 'responsive'
};

export const selectPropsTags = {
  mode: 'multiple',
  options: optionsTags,
  placeholder: 'Выберите теги',
  maxTagCount: 'responsive'
};

export const selectPropsKeywords = {
  mode: 'multiple',
  options: optionsKeywords,
  placeholder: 'Выберите ключевые слова',
  maxTagCount: 'responsive'
};

export const selectPropsAnswers = {
  mode: 'multiple',
  options: optionsAnswers,
  placeholder: 'Выберите ответы',
  maxTagCount: 'responsive'
};
