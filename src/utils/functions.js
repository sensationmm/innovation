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
