import cleanObj from './cleanObj.js';

export default function jsonToQueryStringWithArray(json = {}, firstParam = false) {
  const obj = cleanObj(json);

  if (!obj || Object.keys(obj).length === 0) return '';

  let qs = `${firstParam ? '?' : '&'}${Object.keys(obj)
    .map((key) => {
      if (Array.isArray(json[key])) {
        const array = json[key];
        const stringArray = [];

        array.forEach((d) => stringArray.push(d.value));

        return json[key].length ? `${key}=${stringArray.join()}` : '';
      }
      if (key === 'iinBin' || key === 'rnn') {
        return json[key] ? `taxPayer.${key}=${json[key]}` : '';
      }
      if (typeof json[key] === 'object') {
        // Хардкод периода даты
        return json[key]
          ? `${key}.${Object.keys(json[key])[0]}=${json[key][Object.keys(json[key])[0]]}&${key}.${
              Object.keys(json[key])[1]
            }=${json[key][Object.keys(json[key])[1]]}`
          : '';
      }

      return json[key] ? `${key}=${json[key]}` : '';
    })
    .join('&')}`;

  if (qs?.length && qs.charAt(qs.length - 1) === '&') {
    qs = qs.slice(0, -1);
  }

  return qs;
}
