const download = require('./api/download');

module.exports = (req, res) => {
  const { pathname = '/' } = req.nextUrl;

  if (pathname === '/download') {
    return download(req, res);
  }

  // Handle other routes or serve your static website
};
