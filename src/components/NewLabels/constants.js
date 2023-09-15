import { LANG_KEY } from '../../constants/index.js';

export const initialValues = (score) => {
  return {
    id: null,
    score,
    markContents: [
      {
        id: null,
        text: '',
        langKey: LANG_KEY.RU,
      },
      {
        id: null,
        text: '',
        langKey: LANG_KEY.KZ,
      },
      {
        id: null,
        text: '',
        langKey: LANG_KEY.EN,
      },
    ],
    organizationDto: {
      name: 'Freedom',
      code: 'Freedom',
    },
  };
};

export const marksByNum = (data, num) => {
  const dataArr = Object.values(data);
  return dataArr.filter((item) => item?.find((s) => s.score === num));
};
