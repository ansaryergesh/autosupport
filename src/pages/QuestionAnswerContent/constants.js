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
          name: 'string'
        }
      ]
    },
    questionContents: [
      {
        id: 0,
        langKey: 'EN',
        title: 'string',
        stepDescription: 'string',
        tags: [
          {
            id: 0,
            text: 'string'
          }
        ],
        keyWords: [
          {
            id: 0,
            text: 'string'
          }
        ]
      }
    ]
  },
  resource: {
    id: 0,
    code: 'string',
    name: 'string'
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
};
