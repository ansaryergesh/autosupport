import { LANG_KEY } from '../../constants/index.js';

export const initialValues = {
  id: 0,
  code: '',
  resourceContents: [
    {
      id: 0,
      langKey: LANG_KEY.RU,
      name: '',
    },
    {
      id: 0,
      langKey: LANG_KEY.KZ,
      name: '',
    },
    {
      id: 0,
      langKey: LANG_KEY.EN,
      name: '',
    },
  ],
};
