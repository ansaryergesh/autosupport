import cleanObj from './cleanObj.js';

export default function jsonToQueryString(json) {
  const data = cleanObj(json);

  if (!json || !data || Object.keys(data).length === 0) return '';

  let qs = `?${Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&')}`;

  if (qs?.length && qs.charAt(qs.length - 1) === '&') {
    qs = qs.slice(0, -1);
  }

  return qs;
}
