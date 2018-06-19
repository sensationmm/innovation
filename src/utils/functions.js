export const makeArrayFromIndexedObject = (obj) => {
  return Object.keys(obj).map((k) => obj[k])
}

// returns an array of objects matching specified key/value pair from array
export const getByKey = (arr, id, key = 'id') => {
  const filteredArray = arr.filter(obj => {
    return obj[key] === id;
  });
  return filteredArray.length ? filteredArray : null;
};
