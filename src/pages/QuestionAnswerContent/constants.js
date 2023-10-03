import { LocalStorageKeys } from '../../storage/localStorageKey.js';

export const initialQuestionAnswerContent = {
  id: null,
  question: {
    id: 0,
    orderNumber: 0,
    counter: 0,
    categorie: {
      id: 0,
      orderNumber: 0,
      categorieContents: [
        {
          id: 0,
          langKey: 'EN',
          name: ''
        }
      ]
    },
    questionContents: [
      {
        id: 0,
        langKey: 'EN',
        title: '',
        stepDescription: '',
        tags: [
          {
            id: 0,
            text: ''
          }
        ],
        keyWords: [
          {
            id: 0,
            text: ''
          }
        ]
      }
    ]
  },
  resource: {
    id: 0,
    code: '',
    name: ''
  },
  answerContents: [
    {
      langKey: 'EN',
      stepDescription: '',
      videoUrl: '',
      videoDescription: '',
      images: []
    },
    {
      langKey: 'RU',
      stepDescription: '',
      videoUrl: '',
      videoDescription: '',
      images: []
    },
    {
      langKey: 'KZ',
      stepDescription: '',
      videoUrl: '',
      videoDescription: '',
      images: []
    }
  ],
  status: null
};

export const saveAnswerNews = (answerFormData) => {
  let answerFormDataList =
    JSON.parse(localStorage.getItem(LocalStorageKeys.ANSWER_FROM_DATA)) || [];
  const filtered = answerFormDataList.filter(
    (item) => item.resource?.id !== answerFormData.resource?.id
  );
  answerFormDataList = [...filtered, answerFormData];
  localStorage.setItem(
    LocalStorageKeys.ANSWER_FROM_DATA,
    JSON.stringify(answerFormDataList)
  );
};

export const getAnswerFormDataByResource = (resource) => {
  let answerFormDataList =
    JSON.parse(localStorage.getItem(LocalStorageKeys.ANSWER_FROM_DATA)) || [];
  return (
    answerFormDataList.find((item) => item.resource.id === resource.id) || null
  );
};
