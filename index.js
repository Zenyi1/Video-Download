const download = require('./api/download');

module.exports = (req, res) => {
  const { pathname = '/' } = req;

  if (pathname === '/download') {
    return download(req, res);
  }

  // Handle other routes or serve your static website
};
