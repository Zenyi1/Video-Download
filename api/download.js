const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const { URL } = req.query;
  res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(URL, { format: 'mp4' }).pipe(res);
};
