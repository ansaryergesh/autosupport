export const initialData = {
  id: 0,
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
        title: 'FREEDOM',
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
    ],
    children: ['string']
  },
  resource: {
    id: 0,
    code: 'string',
    name: 'string'
  },
  answerContents: [
    {
      id: 0,
      langKey: 'EN',
      stepDescription:
        '<h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, error.</h1><ol><li>Lorem ipsum dolor sit amet, consectetur adipisicing.<br></li><li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing. </li><li>Lorem ipsum <strong>dolor</strong> sit amet, consectetur adipisicing. </li><li>Lorem ipsum dolor sit amet, consectetur adipisicing. </li><li>Lorem ipsum dolor sit amet, consectetur adipisicing. </li><ol><blockquote><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum doloribus dolores sapiente, saepe dignissimos eos incidunt aspernatur facilis sint? Odio repellat eveniet eum culpa illo rem totam sint numquam deleniti.</p></blockquote><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla nesciunt nostrum quisquam veritatis ipsam nobis repudiandae aspernatur? Non nesciunt consectetur magni doloribus laboriosam vitae assumenda, omnis, dolore excepturi quis cum, totam iste eligendi. Similique consequuntur libero molestiae accusantium nisi. Quo, natus provident sapiente eius quam laborum et repudiandae inventore aliquid atque, ipsam officia nemo molestiae a doloribus quaerat perferendis corporis? Quae, distinctio. Quidem rem praesentium omnis quis amet accusantium. Dolore numquam unde fugit voluptatum commodi tenetur, maiores, corrupti provident eius sunt quo enim earum quae sequi, quis animi non atque? Odit deleniti debitis iste necessitatibus a distinctio provident autem accusamus.</p>',
      videoUrl: 'https://www.youtube.com/watch?v=SteYhlZllTw',
      videoDescription: 'string',
      images: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          url: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          description: 'Машина',
          imageOrder: 1
        },
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          url: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80',
          description: 'Природа',
          imageOrder: 2
        },
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          url: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
          description: 'Дрон',
          imageOrder: 3
        }
      ]
    }
  ]
};
