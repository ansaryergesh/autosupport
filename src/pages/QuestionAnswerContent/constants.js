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
          name: '',
        },
      ],
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
            text: '',
          },
        ],
        keyWords: [
          {
            id: 0,
            text: '',
          },
        ],
      },
    ],
  },
  resource: {
    id: 0,
    code: '',
    name: '',
  },
  answerContents: [
    {
      langKey: 'EN',
      stepDescription: '',
      videoUrl: '',
      videoDescription: '',
      images: [],
    },
    {
      langKey: 'RU',
      stepDescription: '',
      videoUrl: '',
      videoDescription: '',
      images: [],
    },
    {
      langKey: 'KZ',
      stepDescription: '',
      videoUrl: '',
      videoDescription: '',
      images: [],
    },
  ],
  status: null,
};
