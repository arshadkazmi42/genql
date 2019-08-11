const parser = {};


parser.json = (data) => {
  return JSON.parse(data);
};

parser.blob = (data) => {
  let rawData = data;
  if (typeof data === 'string') {
    rawData = JSON.parse(rawData);
  }
  return Buffer.from(rawData, 'utf8');
};


const get = (type, data) => {
  if (!parser[type]) {
    return data;
  }

  const fn = parser[type];
  return fn(data);
};


module.exports = {
  get
};
