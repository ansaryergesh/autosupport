const empty = ['', null, undefined];

export default function cleanObj(obj = {}) {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (!empty.includes(value)) acc[key] = value;

    return acc;
  }, {});
}
