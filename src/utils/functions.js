export const makeArrayFromIndexedObject = (obj) => {
  return (obj && Object.keys(obj).length > 0) ? Object.keys(obj).map((k) => obj[k]) : [];
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

// Remove all attributes that have null or falsey values. Mutates in place - pass a copy if you can't mutate..
export const removeNullValueAttrs = (obj) => {
  Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === '' || Object.keys(obj[key]).length === 0 || obj[key] === [] || obj[key] === undefined) && delete obj[key]);
  return obj;
}

// As above but uses recusion to delete nested attributes that have null or 'falsey' values. Mutates in place - pass a copy if you can't mutate.
export const deepRemoveNullValueAttrs = (obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') deepRemoveNullValueAttrs(obj[key]);
    else if (obj[key] === null || obj[key] === '' || Object.keys(obj[key]).length === 0 || obj[key] === [] || obj[key] === undefined) delete obj[key];
  });
  return obj;
}

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const getDataUri = (url, callback) => {
  var image = new Image();

  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    canvas.getContext('2d').drawImage(this, 0, 0);

    // Get raw image data
    callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
  };

  image.src = url;
}
