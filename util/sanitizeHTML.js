const xss = require('xss');

let options = {
  whiteList: {
    ...xss.whiteList,
    iframe: ['width', 'height', 'src', 'frameborder', 'allowfullscreen'],
  },
};

module.exports = (value) => {
  return xss(value, options);
};
