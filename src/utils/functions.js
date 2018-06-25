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

// returns location in array of objects matching specified key/value pair
export const getIndexByKey = (arr, id, key = 'id') => {
  let index = -1;

  arr.forEach((obj, count) => {
    if(obj[key] === id) {
      index = count;
    }
  });

  return index;
};

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
