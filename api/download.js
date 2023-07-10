const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const videoId = req.query.videoId;
  if (videoId) {
    const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
    const file = ytdl(videoUrl, { filter: 'audioonly' });
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp3"');
    file.pipe(res);
  } else {
    res.status(400).send('Invalid request');
  }
};

