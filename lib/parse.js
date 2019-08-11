const parser = {};


parser.json = (data) => {
  return JSON.parse(data);
};

parser.blob = (data) => {
  return Buffer.from(data, 'utf8'); 
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
